const fs = require('fs')
// 파일을 읽어 들입니다.
fs.readFile('test.txt', 'utf-8', function (err, data) {
  // 읽어 들이기를 완료했을 때의 처리
  console.log(data)
})