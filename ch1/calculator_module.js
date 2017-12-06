// 덧셈과 곱셈하는 함수
function add (a, b) {
  return a + b
}
function mul (a, b) {
  return a * b
}
// 외부에 공개합니다.
module.exports = {
  'add': add,
  'mul': mul
}