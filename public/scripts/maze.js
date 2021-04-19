(async function () {
	const maze = await generator(5, 5);
	console.log(maze);
	await render(maze);
	await mount(document.getElementById('app'));
})();
