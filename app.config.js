const path = require('path'),
	public = path.join(__dirname, 'public');
module.exports = {
	public,
	view: `${public}/views/app.html`,
	'window-option': {
		width: 350,
		height: 370,
		maxWidth: null,
		maxHeight: null,
		minWidth: 310,
		minHeight: 320,
		maximizable: false,
		resizable: true,
		alwaysOnTop: true,
		autoHideMenuBar: true,
		// contextIsolation: false,
		webPreferences: {
			nodeIntegration: true,
		},
	},
};
