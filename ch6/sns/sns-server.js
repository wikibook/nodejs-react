// --------------------------------------------------------
// SNS 서버
// --------------------------------------------------------
// 데이터베이스에 접속합니다. --- (※1)
const db = require('./server/database')
// 웹 서버를 실행합니다. --- (※2)
const express = require('express')
const app = express()
const portNo = 3001
app.listen(portNo, () => {
  console.log('서버 실행 완료:', `http://localhost:${portNo}`)
})
// API를 정의합니다.
// 사용자 추가 전용 API --- (※3)
app.get('/api/adduser', (req, res) => {
  const userid = req.query.userid
  const passwd = req.query.passwd
  if (userid === '' || passwd === '') {
    return res.json({status: false, msg: '필요한 요소를 입력하지 않았습니다.'})
  }
  // 기존 사용자 확인
  db.getUser(userid, (user) => {
    if (user) { // 이미 존재하는 사용자인 경우
      return res.json({status: false, msg: '이미 존재하는 사용자입니다.'})
    }
    // 사용자 추가
    db.addUser(userid, passwd, (token) => {
      if (!token) {
        res.json({status: false, msg: 'DB 오류'})
      }
      res.json({status: true, token})
    })
  })
})
// 사용자 로그인 전용 API - 로그인하면 토큰 응답 --- (※4)
app.get('/api/login', (req, res) => {
  const userid = req.query.userid
  const passwd = req.query.passwd
  db.login(userid, passwd, (err, token) => {
    if (err) {
      res.json({status: false, msg: '인증 오류'})
      return
    }
    // 로그인에 성공했을 때의 토큰 응답
    res.json({status: true, token})
  })
})
// 친구 추가 API --- (※5)
app.get('/api/add_friend', (req, res) => {
  const userid = req.query.userid
  const token = req.query.token
  const friendid = req.query.friendid
  db.checkToken(userid, token, (err, user) => {
    if (err) { // 인증 오류
      res.json({status: false, msg: '인증 오류'})
      return
    }
    // 친구 추가
    user.friends[friendid] = true
    db.updateUser(user, (err) => {
      if (err) {
        res.json({status: false, msg: 'DB 오류'})
        return
      }
      res.json({status: true})
    })
  })
})
// 타임라인에 글쓰기 --- (※6)
app.get('/api/add_timeline', (req, res) => {
  const userid = req.query.userid
  const token = req.query.token
  const comment = req.query.comment
  const time = (new Date()).getTime()
  db.checkToken(userid, token, (err, user) => {
    if (err) {
      res.json({status: false, msg: '인증 오류'})
      return
    }
    // 타임라인에 추가하기
    const item = {userid, comment, time}
    db.timelineDB.insert(item, (err, it) => {
      if (err) {
        res.json({status: false, msg: 'DB 오류'})
        return
      }
      res.json({status: true, timelineid: it._id})
    })
  })
})
// 사용자 목록 추출 --- (※7)
app.get('/api/get_allusers', (req, res) => {
  db.userDB.find({}, (err, docs) => {
    if (err) return res.json({status: false})
    const users = docs.map(e => e.userid)
    res.json({status: true, users})
  })
})
// 사용자 정보 추출 --- (※8)
app.get('/api/get_user', (req, res) => {
  const userid = req.query.userid
  db.getUser(userid, (user) => {
    if (!user) return res.json({status: false})
    res.json({status: true, friends: user.friends})
  })
})
// 친구 타임라인 추출 --- (※9)
app.get('/api/get_friends_timeline', (req, res) => {
  const userid = req.query.userid
  const token = req.query.token
  db.getFriendsTimeline(userid, token, (err, docs) => {
    if (err) {
      res.json({status: false, msg: err.toString()})
      return
    }
    res.json({status: true, timelines: docs})
  })
})
// 정적 파일 제공 --- (※10)
app.use('/public', express.static('./public'))
app.use('/login', express.static('./public'))
app.use('/users', express.static('./public'))
app.use('/timeline', express.static('./public'))
app.use('/', express.static('./public'))