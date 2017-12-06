// 익스프레스 모듈을 읽어 들입니다. --- (※1)
const express = require('express')
const app = express()
const portNo = 3000
// 접근이 있을 때 --- (※2)
app.get('/', (req, res, next) => {
  res.send('Hello World!')
})
// 서버를 실행합니다. --- (※3)
app.listen(portNo, () => {
  console.log('서버 실행 완료:', `http://localhost:${portNo}`)
})