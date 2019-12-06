const {app, BrowserWindow, nativeImage} = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow () {
 
  win = new BrowserWindow({
      width: 1000, 
      height: 800,
      backgroundColor: '#000',
      icon: path.join(__dirname, 'dist/assets/64x64.png')
  });   
  win.setResizable(false);
  // load the dist folder from Angular
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools optionally:
  // win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})