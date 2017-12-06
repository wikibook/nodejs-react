const fs = require('fs')
// 비동기 처리 완료를 기다리고, 다음 함수를 연속해서 호출하는 함수
function read_gfn (g, fname) {
  fs.readFile(fname, 'utf-8', (err, data) => {
    g.next(data)
  })
}
// 제너레이터 함수를 정의합니다.
const g = (function * () {
  const a = yield read_gfn(g, 'a.txt')
  console.log(a)
  const b = yield read_gfn(g, 'b.txt')
  console.log(b)
  const c = yield read_gfn(g, 'c.txt')
  console.log(c)
})()