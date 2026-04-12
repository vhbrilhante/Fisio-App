const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');

// Disable hardware acceleration to prevent system restarts on certain Windows/GPU configurations
app.disableHardwareAcceleration();

const isDev = !app.isPackaged;

ipcMain.handle('save-document', async (event, buffer, fileName) => {
  try {
    const documentsPath = app.getPath('documents');
    const targetDir = path.join(documentsPath, 'FisioShara_Relatorios');
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const filePath = path.join(targetDir, `${fileName}.docx`);
    fs.writeFileSync(filePath, Buffer.from(buffer));
    
    // Abrir a pasta automaticamente para facilitar para a usuária (tia)
    shell.showItemInFolder(filePath);
    
    return { success: true, path: filePath };
  } catch (error) {
    console.error('Error saving document:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('delete-file', async (event, filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return { success: true };
    }
    return { success: false, error: 'Arquivo não encontrado' };
  } catch (error) {
    console.error('Error deleting file:', error);
    return { success: false, error: error.message };
  }
});
ipcMain.handle('open-folder', async (event, filePath) => {
  try {
    if (filePath) {
      shell.showItemInFolder(filePath);
    } else {
      const documentsPath = app.getPath('documents');
      const targetDir = path.join(documentsPath, 'FisioShara_Relatorios');
      shell.openPath(targetDir);
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#F4F4F0', // Match theme background
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    autoHideMenuBar: true,
    titleBarStyle: 'hiddenInset',
    roundedCorners: false,
  });

  if (isDev) {
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();
  } else {
    // Para Next.js exportado, o index.html é carregado via arquivo direto.
    // Garantimos que o caminho seja absoluto e correto.
    const indexPath = path.join(__dirname, '../out/index.html');
    win.loadFile(indexPath).catch(err => {
      console.error('Falha ao carregar o app:', err);
    });
  }

  // Interceptar navegação para abrir links externos no navegador real
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
