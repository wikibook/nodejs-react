// 데이터베이스와 관련된 처리
const path = require('path')
const NeDB = require('nedb')
// 데이터베이스에 접속합니다. --- (※1)
const userDB = new NeDB({
  filename: path.join(__dirname, 'user.db'),
  autoload: true
})
const timelineDB = new NeDB({
  filename: path.join(__dirname, 'timeline.db'),
  autoload: true
})
// 해시(sha512) 추출하기 --- (※2)
function getHash (pw) {
  const salt = '::EVuCM0QwfI48Krpr'
  const crypto = require('crypto')
  const hashsum = crypto.createHash('sha512')
  hashsum.update(pw + salt)
  return hashsum.digest('hex')
}
// 인증 전용 토큰 생성하기 --- (※3)
function getAuthToken (userid) {
  const time = (new Date()).getTime()
  return getHash(`${userid}:${time}`)
}
// API에서 사용하는 DB 조작 함수 --- (※4)
// 사용자 검색하기
function getUser (userid, callback) {
  userDB.findOne({userid}, (err, user) => {
    if (err || user === null) return callback(null)
    callback(user)
  })
}
// 사용자 추가하기 --- (※5)
function addUser (userid, passwd, callback) {
  const hash = getHash(passwd)
  const token = getAuthToken(userid)
  const regDoc = {userid, hash, token, friends: {}}
  userDB.insert(regDoc, (err, newdoc) => {
    if (err) return callback(null)
    callback(token)
  })
}
// 로그인 처리 --- (※6)
function login (userid, passwd, callback) {
  const hash = getHash(passwd)
  const token = getAuthToken(userid)
  // 사용자 정보 추출
  getUser(userid, (user) => {
    if (!user || user.hash !== hash) {
      return callback(new Error('인증 오류'), null)
    }
    // 인증 토큰 변경
    user.token = token
    updateUser(user, (err) => {
      if (err) return callback(err, null)
      callback(null, token)
    })
  })
}
// 인증 토큰 확인하기 --- (※7)
function checkToken (userid, token, callback) {
  // 사용자 정보 추출하기
  getUser(userid, (user) => {
    if (!user || user.token !== token) {
      return callback(new Error('인증 실패'), null)
    }
    callback(null, user)
  })
}
// 사용자 정보 변경하기 --- (※8)
function updateUser (user, callback) {
  userDB.update({userid: user.userid}, user, {}, (err, n) => {
    if (err) return callback(err, null)
    callback(null)
  })
}
// 친구의 타임라인 추출하기 --- (※9)
function getFriendsTimeline (userid, token, callback) {
  checkToken(userid, token, (err, user) => {
    if (err) return callback(new Error('인증 실패'), null)
    // 친구 목록 추출
    const friends = []
    for (const f in user.friends) friends.push(f)
    friends.push(userid) // 친구 목록에 자신까지 포함합니다.
    // 친구 타임라인을 최대 20개 추출합니다.
    timelineDB
      .find({userid: {$in: friends}})
      .sort({time: -1})
      .limit(20)
      .exec((err, docs) => {
        if (err) {
          callback(new Error('DB 오류'), null)
          return
        }
        callback(null, docs)
      })
  })
}
module.exports = {
  userDB, timelineDB, getUser, addUser, login, checkToken, updateUser, getFriendsTimeline
}