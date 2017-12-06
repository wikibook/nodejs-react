// 파일을 비동기로 읽는 프로그램
const fs = require('fs') // fs 모듈을 사용합니다.

// 파일을 읽어 들입니다.
fs.readFile('test.txt', 'utf-8', testLoaded)

// 읽기를 완료했을 때 실행할 함수
function testLoaded (err, data) {
  if (err) {
    console.log('읽기 실패')
    return
  }
  console.log(data)
}