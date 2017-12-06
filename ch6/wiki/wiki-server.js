// --------------------------------------------------------
// 위키 웹 서버
// --------------------------------------------------------
// 데이터베이스에 접속합니다. --- (※1)
const path = require('path')
const NeDB = require('nedb')
const db = new NeDB({
  filename: path.join(__dirname, 'wiki.db'),
  autoload: true
})
// 웹 서버를 실행합니다. --- (※2)
const express = require('express')
const app = express()
const portNo = 3001
// body-parser를 사용합니다.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.listen(portNo, () => {
  console.log('서버 실행 완료:', `http://localhost:${portNo}`)
})
// API를 정의합니다.
// 위키 데이터를 응답하는 API --- (※3)
app.get('/api/get/:wikiname', (req, res) => {
  const wikiname = req.params.wikiname
  db.find({name: wikiname}, (err, docs) => {
    if (err) {
      res.json({status: false, msg: err})
      return
    }
    if (docs.length === 0) {
      docs = [{name: wikiname, body: ''}]
    }
    res.json({status: true, data: docs[0]})
  })
})
// 위키 데이터를 작성하는 API --- (※4)
app.post('/api/put/:wikiname', (req, res) => {
  const wikiname = req.params.wikiname
  console.log('/api/put/' + wikiname, req.body)
  // 기존에 존재하는 엔트리인지 확인합니다.
  db.find({'name': wikiname}, (err, docs) => {
    if (err) {
      res.json({status: false, msg: err})
      return
    }
    const body = req.body.body
    if (docs.length === 0) { // 기존에 엔트리가 없다면 삽입
      db.insert({name: wikiname, body})
    } else { // 기존에 엔트리가 있다면 수정
      db.update({name: wikiname}, {name: wikiname, body})
    }
    res.json({status: true})
  })
})
// public 디렉터리를 공개합니다. --- (※5)
app.use('/wiki/:wikiname', express.static('./public'))
app.use('/edit/:wikiname', express.static('./public'))
app.get('/', (req, res) => {
  res.redirect(302, '/wiki/FrontPage')
})