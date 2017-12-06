const fs = require('fs')
const path = require('path')
// CSV 파일 열기
const csv = fs.readFileSync(
  path.join(__dirname, 'database', 'images.csv'),
  'utf-8')
// 줄바꿈으로 자르고 임의 숫자로 셔플 --- (※1)
const a = csv.split('\n')
const shuffle = () => Math.random() - 0.5
const b = a.sort(shuffle)
// 2000개, 500개로 분류하기
const c1 = b.slice(0, 2000)
const c2 = b.slice(2000, 2500)
// 파일로 저장
fs.writeFileSync('image-train.csv', c1.join('\n'))
fs.writeFileSync('image-test.csv', c2.join('\n'))
console.log('ok')