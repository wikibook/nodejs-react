// 익스프레스를 실행합니다.
const express = require('express')
const app = express()
// body-parser를 사용합니다.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.listen(3000, () => {
  console.log('서버 실행 완료 - http://localhost:3000')
})
// GET 메서드라면 입력 양식을 응답합니다.
app.get('/', (req, res) => {
  res.send('<form method="POST">' +
    '<textarea name="memo">테스트</textarea>' +
    '<br /><input type="submit" value="전송">' +
    '</form>')
})
// POST 메서드를 받습니다.
app.post('/', (req, res) => {
  const s = JSON.stringify(req.body)
  res.send('POST: ' + s)
})