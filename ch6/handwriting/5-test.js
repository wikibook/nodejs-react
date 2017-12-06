const fs = require('fs')
const path = require('path')
const svm = require('node-svm')
// 학습된 데이터 읽어 들이기 --- (※1)
const json = fs.readFileSync(
  path.join(__dirname, 'database', 'image-model.svm'),
  'utf-8')
const model = JSON.parse(json)
const clf = svm.restore(model)
// 테스트 데이터 읽어 들이기 --- (※2)
const testData = loadCSV('image-test.csv')
// 테스트해서 오류 비율 구하기 --- (※3)
let count = 0
let ng = 0
testData.forEach(ex => {
  const x = ex[0]
  const label = ex[1]
  const pre = clf.predictSync(x)
  if (label !== pre) {
    ng++
    console.log('ng=', label, pre)
  }
  count++
})
console.log('오류 비율 =', (ng / count) * 100)
// CSV 파일 읽어 들이기 --- (※4)
function loadCSV (fname) {
  const csv = fs.readFileSync(fname, 'utf-8')
  const lines = csv.split('\n')
  const data = lines.map(line => {
    const cells = line.split(',')
    const x = cells.map(v => parseInt(v))
    const label = x.shift()
    return [x, label]
  })
  return data
}