// 익스프레스를 실행합니다.
const express = require('express')
const app = express()
// 서버를 실행합니다.
app.listen(3000, () => {
  console.log('서버 실행 완료 - http://localhost:3000')
})
// 정적 파일을 제공합니다.
app.use('/', express.static('./html'))