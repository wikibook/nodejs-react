// 제너레이터 함수를 정의합니다. --- (※1)
function * counter () {
  yield 1
  yield 2
  yield 3
}
// 제너레이터 객체를 생성합니다. --- (※2)
const g = counter()
// next() 메서드를 호출합니다. --- (※3)
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())