const Mastodon = require('mastodon-api')
const fs = require('fs')
const path = require('path')
const readlineSync = require('readline-sync')
const file_cli_app = path.join(__dirname, 'cli-app.json')
const file_user = path.join(__dirname, 'token.json')
const instanceUri = 'https://pawoo.net'
// 파일에서 클라이언트의 정보를 읽어 들입니다.
const info = JSON.parse(fs.readFileSync(file_cli_app))
// 인증 전용 URL을 추출합니다.
Mastodon.getAuthorizationUrl(
    info.client_id,
    info.client_secret,
    instanceUri)
  .then(url => {
    console.log("다음 URL에 접근해서 출력되는 코드를 입력해주세요.")
    console.log(url)
    // 명령줄에 코드를 추출합니다.
    const code = readlineSync.question('Code: ')
    // 접근 토큰을 추출합니다.
    return Mastodon.getAccessToken(
      info.client_id,
      info.client_secret,
      code,
      instanceUri)
  })
  .then(token => {
    console.log('Access Token: ', token)
    fs.writeFileSync(file_user, token)
  })