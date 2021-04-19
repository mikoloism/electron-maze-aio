const [electron, config, { views, pug }] = [
		require('electron'),
		require('./app.config.js'),
		require('./pug-compiler'),
	],
	{ app, BrowserWindow } = electron;

async function createWindow() {
	try {
		await pug(config.pug, config.view);
		const main = new BrowserWindow(config.option);
		main.loadFile(views(config.view));
	} catch (err) {
		console.log('[ERROR] : we have error!');
	}
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
