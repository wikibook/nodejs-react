// 문자 인식 서버
const path = require('path')
const fs = require('fs')
// 상수 정의
const SVM_MODEL = path.join(__dirname, 'database', 'image-model.svm')
const portNo = 3001 // 서버의 포트

// 웹 서버 실행
const express = require('express')
const app = express()
app.listen(portNo, () => {
  console.log('서버 실행 완료:', `http://localhost:${portNo}`)
})
// 학습 모델 읽어 들이기 --- (※1)
const svm = require('node-svm')
const modelJSON = fs.readFileSync(SVM_MODEL, 'utf-8')
const model = JSON.parse(modelJSON)
const clf = svm.restore(model)
// API를 정의합니다. --- (※2)
app.get('/api/predict', (req, res) => {
  const px = req.query.px
  if (!px) {
    res.json({status: false})
    return
  }
  const pxa = px.split('').map(v => parseInt('0x' + v) * 16)
  console.log('데이터:', pxa.join(':'))
  clf.predict(pxa).then((label) => {
    res.json({status: true, label})
    console.log('분류:', label)
  })
})
// 정적 파일 제공
app.use('/', express.static('./public'))