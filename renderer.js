const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  saveMemo: (text) => ipcRenderer.invoke("save-memo", text)
});
