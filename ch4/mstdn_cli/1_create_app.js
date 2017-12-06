// 웹 API을 통해 애플리케이션을 서버에 등록합니다.
const Mastodon = require('mastodon-api')
const fs = require('fs')
const path = require('path')
const instanceUri = 'https://pawoo.net'
const clientName = 'MasdonCli'
const savefile = path.join(__dirname, 'cli-app.json')
// 웹 API를 호출합니다.
Mastodon.createOAuthApp(instanceUri+'/api/v1/apps', clientName)
  .catch(err => console.error(err))
  .then(res => {
    console.log(res)
    fs.writeFileSync(savefile, JSON.stringify(res))
  })