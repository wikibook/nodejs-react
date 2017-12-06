// Foo 클래스를 정의합니다.
class Foo {
  constructor () {
    this.value = 100
  }
  bar() {
    console.log('Foo.bar')
    console.log(this.value)
  }
}
// Foo를 사용합니다.
const f = new Foo()
f.bar()