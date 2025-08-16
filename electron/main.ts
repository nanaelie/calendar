import { Tray, app, BrowserWindow, ipcMain, Notification } from "electron";
import path from "path";

let win: any;


function createWindow() {
	const tray = new Tray('./src/assets/images/cover.png');
	tray.setToolTip('Calendrier');
	win = new BrowserWindow({
		width: 800,
		height: 600,
		maxWidth: 800,
		maxHeight: 600,
		resizable: false,
		frame: false,
		movable: true,
		hasShadow: true,
		roundedCorners: true,
		autoHideMenuBar: true,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			contextIsolation: true,
			nodeIntegration: false,
		},
	});

	win.loadFile(path.join(__dirname, "../src/index.html"));
	
	if (process.platform === "darwin") {
		try {
			win.setWindowButtonVisibility(false);
		} catch {}
	}
}

ipcMain.on('window:close', () => { if (win) win.close(); });
ipcMain.on('window:minimize', () => { if (win) win.minimize(); });
ipcMain.on('showNotification', (event, ...args) => {
  const [type, title, body] = args;

  const notifTitle = type === 'great' ? `${title} ${process.env.USER}` : title;

  const notif = new Notification({
    title: notifTitle,
    body: body
  });

  notif.show();
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

