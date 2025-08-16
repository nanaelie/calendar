import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
	closeApp: () => ipcRenderer.send('window:close'),
	minimizeApp: () => ipcRenderer.send('window:minimize'),
	showNotification: (e, title, body) => ipcRenderer.send('showNotification', e, title, body),
});

