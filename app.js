const [electron, config] = [require('electron'), require('./app.config.js')],
	{ app, BrowserWindow } = electron;

function createWindow() {
	const main = new BrowserWindow(config['window-option']);
	main.loadFile(config.view);
}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
