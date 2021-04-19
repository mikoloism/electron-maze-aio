const [electron, config, path] = [
		require('electron'),
		require('./app.config.js'),
		require('path'),
	],
	{ app, BrowserWindow } = electron;
const views = (...paths) => path.join(__dirname, 'public', 'views', ...paths);

function createWindow() {
	const main = new BrowserWindow(config.option);
	main.loadFile(views('maze.html'));
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
