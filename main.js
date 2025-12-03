const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js')
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

// メモ保存処理
ipcMain.handle("save-memo", async (_, text) => {
  const timestamp = new Date().toISOString();
  const line = `${timestamp} - ${text}\n`;

  const filePath = path.join(app.getPath('documents'), "simple_memo.txt");

  fs.appendFileSync(filePath, line);

  return filePath;
});
