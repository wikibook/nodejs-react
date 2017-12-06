const fs = require('fs')
const path = require('path')
const svm = require('node-svm')
// CSV 파일 읽어 들이기 --- (※1)
const data = loadCSV('image-train.csv')
// node-svm으로 데이터 학습시키기 --- (※2)
const clf = new svm.CSVC()
clf
  .train(data)
  .progress(progress => {
    console.log('학습: %d%', Math.round(progress * 100))
  })
  .spread((model, report) => {
    // 학습 데이터 저장 --- (※3)
    const json = JSON.stringify(model)
    fs.writeFileSync(
      path.join(__dirname, 'database', 'image-model.svm'),
      json)
      console.log('완료')
    })
  // CSV 파일을 읽어 들이고 node-svm 형식으로 변환하기 --- (※4)
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