// 일렉트론 실행에 필요한 모듈을 읽어 들입니다.
const electron = require('electron')
const path = require('path')
const url = require('url')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
// 일렉트론의 라이프사이클을 정의합니다.
let mainWindow // 메인 화면을 출력할 변수입니다.
app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
// 화면을 생성하고 콘텐츠를 읽어 들입니다.
function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL(url.format({ // 읽어 들일 콘텐츠를 지정합니다. --- (※1)
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  // 화면이 닫혔을 때의 처리
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}