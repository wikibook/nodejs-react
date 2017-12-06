// 익스프레스 모듈을 읽어 들입니다.
const express = require('express')
const app = express()
const portNo = 3000
// URL에 따라 처리 분기하기
// 루트에 접근할 때
app.get('/', (req, res) => {
  res.send(
    '<p><a href="/dice/6">6면체 주사위</a><br />' +
    '<a href="/dice/12">12면체 주사위</a></p>')
})
// 주사위 페이지에 겁근할 때
app.get('/dice/6', (req, res) => {
  res.send('주사위의 값은...' + dice(6))
})
app.get('/dice/12', (req, res) => {
  res.send('주사위의 값은...' + dice(12))
})
function dice(n) {
  return Math.floor(Math.random() * n) + 1
}
// 서버를 실행합니다.
app.listen(portNo, () => {
  console.log('서버 실행 완료:', `http://localhost:${portNo}`)
})