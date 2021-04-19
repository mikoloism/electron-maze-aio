const [pug, pather, fs] = [require('pug'), require('path'), require('fs')];

const views = pather.join(__dirname, './../../public', 'views');
const path = (...args) => pather.join(views, ...args);

const compiler = async (input, output, variables) => {
	const html = await pug.renderFile(path(input));
	await fs.writeFileSync(path(output), html, 'utf8');
	return true;
};

const render = async (input, output, variables) => {
	const html = await pug.renderFile(input);
	await fs.writeFileSync(output, html, 'utf8');
	return true;
};

module.exports = { views: path, pug: compiler, render };
