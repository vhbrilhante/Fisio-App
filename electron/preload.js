const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveDocument: (buffer, fileName) => ipcRenderer.invoke('save-document', buffer, fileName),
  deleteFile: (filePath) => ipcRenderer.invoke('delete-file', filePath),
  openFolder: (filePath) => ipcRenderer.invoke('open-folder', filePath),
});
