const pather = require('path');
const path = (...paths) => pather.join(__dirname, ...paths);
const { render } = require('./pug-compiler');
const [
	env1,
	env2,
	input_command,
	input_path,
	output_command,
	output_path,
] = process.argv;

console.log(
	`
	/___\\_________
	| @ | PUG-WATCH
	\\___/_________
`,
);

render(path(input_path), path(output_path));
