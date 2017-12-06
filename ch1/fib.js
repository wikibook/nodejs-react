// 피보나치 수를 계산하는 제너레이터 함수를 정의합니다.
function * genFibonacci () {
  let a = 0
  let b = 1
  while (true) {
    [a, b] = [b, a + b]
    yield a
  }
}

// 제너레이터 객체를 추출합니다.
const fib = genFibonacci()
for (const num of fib) {
  // 무한 반복하게 되므로 50을 넘으면 탈출하게 합니다.
  if (num > 50) break
  console.log(num)
}