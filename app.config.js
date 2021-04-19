module.exports = {
	view: `index.html`,
	option: {
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
		// contextIsolation: true,
		webPreferences: {
			// nodeIntegration: true,
			contextIsolation: true,
		},
	},
};
