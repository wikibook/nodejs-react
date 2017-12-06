const fs = require('fs')
const path = require('path')
// 변환
convertToCSV(path.join(__dirname, 'database'))
function convertToCSV (dbdir) {
  // 파일 이름 지정
  const imgFile = path.join(dbdir, 'images-idx3')
  const lblFile = path.join(dbdir, 'labels-idx1')
  const csvFile = path.join(dbdir, 'images.csv')
  // 파일 열기 --- (※1)
  const imgF = fs.openSync(imgFile, 'r')
  const lblF = fs.openSync(lblFile, 'r')
  const outF = fs.openSync(csvFile, 'w+')
  // 이미지 데이터베이스의 헤더 읽기 --- (※2)
  const ibuf = Buffer.alloc(16)
  fs.readSync(imgF, ibuf, 0, ibuf.length)
  const magic = ibuf.readUInt32BE(0)
  const numImages = ibuf.readUInt32BE(4)
  const numRows = ibuf.readUInt32BE(8)
  const numCols = ibuf.readUInt32BE(12)
  const numPixels = numRows * numCols
  // 헤더 검증
  if (magic !== 2051) throw new Error('파일에 문제가 있습니다.')
  console.log('이미지 수 =', numImages, numRows, 'x', numCols)
  // 레이블 데이터의 헤더 검증 --- (※3)
  const lbuf = Buffer.alloc(8)
  fs.readSync(lblF, lbuf, 0, lbuf.length)
  const magicl = lbuf.readUInt32BE(0)
  if (magicl !== 2049) throw new Error('파일에 문제가 있습니다.')
  // 이미지 추출하기 --- (※4)
  const pixels = Buffer.alloc(numPixels)
  const labelb = Buffer.alloc(1)
  for (let i = 0; i < numImages; i++) {
    // 진행률 출력하기
    if (i % 1000 === 0) console.log(i, '/', numImages)
    // 이미지 읽기 --- (※5)
    fs.readSync(imgF, pixels, 0, numPixels)
    fs.readSync(lblF, labelb, 0, 1)
    const line = new Uint8Array(pixels)
    const label = labelb.readInt8(0)
    // PGM 형식으로 저장 --- (※6)
    if (i < 20) {
      let s = 'P2 28 28 255\n'
      for (let j = 0; j < numPixels; j++) {
        s += line[j].toString()
        s += (j % 28 === 27) ? '\n' : ' '
      }
      const savefile = path.join(dbdir, label + '_test_' + i + '.pgm')
      fs.writeFileSync(savefile, s, 'utf-8')
    }
    // CSV 한 줄 만들기 --- (※7)
    const csvline = label + ',' + line.join(',') + '\n'
    fs.writeSync(outF, csvline, 'utf-8')
  }
  console.log('ok')
}      