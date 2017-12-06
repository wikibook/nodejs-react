// http 모듈을 읽어 들입니다.
const http = require('http')

// 웹 서버를 실행합니다. --- (※1)
const svr = http.createServer(handler) // 서버를 생성합니다.
svr.listen(8081) // 8081번 포트를 사용합니다.

// 서버에 접근이 있을 때의 처리 --- (※2)
function handler (req, res) {
  console.log('url:', req.url)
  console.log('method:', req.method)
  // HTTP 헤더를 출력합니다.
  res.writeHead(200, {'Content-Type': 'text/html'})
  // 응답 본문을 출력합니다.
  res.end('<h1>Hello, World!</h1>\n')
}