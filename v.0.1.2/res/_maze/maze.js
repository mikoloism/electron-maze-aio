const raw = [
	[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
	[2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2],
	[2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2],
	[2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 3, 2, 2, 2],
	[2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2],
	[2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2],
	[2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
];

const [checkEndPoint, validNext, go, direct] = [
	(maze, [x, y]) => {
		return (
			(!!maze[y] && maze[y][x] == 3) ||
			(!!maze[y] && maze[y][x + 1] == 3) ||
			(!!maze[y] && maze[y][x - 1] == 3) ||
			(!!maze[y - 1] && maze[y - 1][x] == 3) ||
			(!!maze[y + 1] && maze[y + 1][x] == 3)
		);
	},
	(maze, [x, y]) => {
		const validList = [];
		if (!!maze[y - 1] && maze[y - 1][x] != 2 && maze[y - 1][x] != 3)
			validList.push({ nextX: x, nextY: y - 1, nextDirection: 'UP' });
		if (!!maze[y + 1] && maze[y + 1][x] != 2 && maze[y + 1][x] != 3)
			validList.push({ nextX: x, nextY: y + 1, nextDirection: 'DOWN' });
		if (!!maze[y] && maze[y][x + 1] != 2 && maze[y][x + 1] != 3)
			validList.push({ nextX: x + 1, nextY: y, nextDirection: 'RIGHT' });
		if (!!maze[y] && maze[y][x - 1] != 2 && maze[y][x - 1] != 3)
			validList.push({ nextX: x - 1, nextY: y, nextDirection: 'LEFT' });
		return validList;
	},
	(maze, [x, y], thread = 1) => {
		maze[y][x] = 2;
		return [x, y];
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

const [endX, endY] = [10, 3];
/*
const router = (maze, currentX, currentY, threadNumber = 1) => {
	const valids = validNext(maze, [currentX, currentY]);
	if (currentX == endX && currentY == endY) return 'FINISH';
	else {
		if (valids.length != 0) {
			return valids.map((way, index) => {
				const { nextX, nextY, nextDirection } = way;

				maze[currentY][currentX] = 2;
				console.log({
					current: [currentX, currentY],
					next: [nextX, nextY],
					next_directions: nextDirection,
					nextThread: index,
					thread: threadNumber,
				});
				return router(maze, nextX, nextY, index);
			});
		}
	}
}; */
const log = [];
const router = (maze, [x, y], thread = 0) => {
	validNext(maze, [x, y]).map((way, index) => {
		const { nextX, nextY, nextDirection } = way;
		if (x == endX && y == endY) return 'finish';
		const [x2, y2] = go(maze, [nextX, nextY], thread);
		log.push({ thread, next: [nextX, nextY], nextDirection });
		return router(maze, [x2, y2], index);
	});
	return log; //.sort((a, b) => a.thread - b.thread);
};

console.log(router(raw, [3, 3])); //10, 3
