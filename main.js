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
  const now = new Date();
  const timestamp = new Date().toISOString();
  const line = `${timestamp}\n${text}\n`;

  const docDir = path.join(__dirname, "doc");
  
  if (!fs.existsSync(docDir)) {
    fs.mkdirSync(docDir);
  }

  // ▼ ファイル名 yyyymmdd.txt
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const filename = `${yyyy}${mm}${dd}.txt`;
 
  const filePath = path.join(docDir, filename);

  fs.appendFileSync(filePath, line);

  return filePath;
});
