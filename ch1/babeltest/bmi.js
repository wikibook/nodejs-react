// BMI 클래스를 정의합니다.
class BMI {
  constructor (height, weight) {
    this.height = height
    this.weight = weight
    this.bmi = this.calc()
  }
  calc () {
    const heightM = this.height / 100
    return this.weight / (heightM ** 2)
  }
  print () {
    let res = '표준'
    if (this.bmi >= 25) res = '비만'
    else if (this.bmi >= 18.5) res = '표준'
    else res = '저체중'
    console.log('BMI =', this.bmi, res)
  }
}
// 테스트
const bmi = new BMI(160, 60)
bmi.print()