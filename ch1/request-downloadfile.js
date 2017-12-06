// 모듈을 읽어 들입니다.
const fs = require('fs')
const request = require('request')

// request 모듈을 사용해 파일을 다운로드합니다.
request('http://uta.pw/shodou/img/28/214.png').pipe(fs.createWriteStream('test.png'))