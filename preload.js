const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  ping: async () => {
     return await ipcRenderer.invoke('invoke-test', 'ping')
  }
});
