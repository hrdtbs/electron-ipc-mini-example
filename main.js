const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const createWindow = () => {
  window = new BrowserWindow({
    title: app.name,
    width: 1024,
    height: 640,
    minWidth: 1024,
    minHeight: 640,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.resolve(`${__dirname}/preload.js`),
    },
  });
  window.loadFile(`index.html`);
  window.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("invoke-test", (event, message) => {
  console.log(message);
  return "pong";
});
