const electron = require('electron')
const path = require('path')
const url = require('url')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
// 일렉트론의 라이프사이클
let mainWindow
app.on('ready', createWindow)
app.on('window-all-closed', () => app.quit())
app.on('activate', () => {
  if (mainWindow === null) createWindow()
})
// 화면을 생성합니다.
function createWindow () {
  mainWindow = new BrowserWindow({width: 600, height: 800})
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}