const fs = require('fs')
// 프로미스로 비동기적으로 파일을 읽어 들이는 함수를 정의합니다.
function readFileEx (fname) {
  return new Promise((resolve, reject) => {
    fs.readFile(fname, 'utf-8', (err, data) => {
      resolve(data)
    })
  })
}
// 모든 파일을 읽어 들이는 async 함수를 정의합니다.
async function readAll () {
  const a = await readFileEx('a.txt')
  console.log(a)
  const b = await readFileEx('b.txt')
  console.log(b)
  const c = await readFileEx('c.txt')
  console.log(c)
}
readAll()