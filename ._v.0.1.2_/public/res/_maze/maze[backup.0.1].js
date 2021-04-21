const raw = [
	[2, 2, 2, 2, 2, 2, 2],
	[2, 1, 1, 1, 1, 1, 2],
	[2, 1, 2, 2, 2, 1, 2],
	[1, 1, 2, 1, 1, 1, 2],
	[2, 1, 2, 1, 2, 1, 2],
	[2, 1, 3, 1, 1, 1, 2],
	[2, 0, 2, 2, 2, 2, 2],
];

const [checkEndPoint, validNext, direct] = [
	(maze, [x, y]) => {
		return (
			maze[y][x] == 3 ||
			maze[y][x + 1] == 3 ||
			maze[y][x - 1] == 3 ||
			(!!maze[y - 1] && maze[y - 1][x] == 3) ||
			(!!maze[y + 1] && maze[y + 1][x] == 3)
		);
	},
	(maze, [x, y]) => {
		const validList = [];
		if (!!maze[y - 1] && maze[y - 1][x] == 1) validList.push([x, y - 1, 'UP']);
		if (!!maze[y + 1] && maze[y + 1][x] == 1) validList.push([x, y + 1, 'DOWN']);
		if (maze[y][x + 1] == 1) validList.push([x + 1, y, 'RIGHT']);
		if (maze[y][x - 1] == 1) validList.push([x - 1, y, 'LEFT']);
		return validList;
	},
	(maze, [x, y], direction) => {
		const calc = {
			UP: maze[y - 1][x],
			RIGHT: maze[y][x + 1],
			LEFT: maze[y][x - 1],
			DOWN: maze[y + 1][x],
		}[direction];
		return calc;
	},
];

const router = (maze, currentX, currentY) => {
	const valids = validNext(maze, [currentX, currentY]);
	// console.log(valids);
	if (valids.length != 0) {
		const [nextX, nextY, direction] = valids[0];
		maze[currentY][currentX] = 4;
		console.log({
			current: [currentX, currentY],
			next: [nextX, nextY],
			direction,
		});
		return router(maze, nextX, nextY);
	} else {
		const result = [];
		if (checkEndPoint(maze, [currentX, currentY])) {
			result.push(['SUCCESSFULLY', maze]);
		} else {
			result.push(['FAILED']);
		}

		return result;
	}
};

console.log(router(raw, 1, 6));
