(async function () {
	const { maze, goal } = await generator(9, 9);
	await render(maze);
	await mount(document.getElementById('app'), {
		start: [1, 1],
		end: [goal.x, goal.y],
	});
	await runner(document.getElementById('app'), maze, [
		[1, 1],
		[goal.x, goal.y],
	]);
})();
