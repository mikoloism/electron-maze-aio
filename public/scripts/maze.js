const [generator, renderer, runner, solver] = [
	require('./maze-generator'),
	null,
	null,
	null,
];
(async () => {
	const maze = generator();
	console.log(maze);
})();
