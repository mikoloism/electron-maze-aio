'use strict';

(function () {
	const board = document.getElementById('board');
	const elRows = Array.from(board.children);

	const rows = [];
	elRows.forEach((row) => {
		const cols = [];
		Array.from(row.children).forEach((col) => cols.push(col));
		rows.push(cols);
	});

	//===============================================

	const [checkEndPoint, validNext, go, sleep] = [
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
			if (
				!!maze[y - 1] &&
				maze[y - 1][x]?.dataset.access != 2
				// && maze[y - 1][x]?.dataset.access != 3
			)
				validList.push({ nextX: x, nextY: y - 1 });
			if (
				!!maze[y + 1] &&
				maze[y + 1][x]?.dataset.access != 2
				// && maze[y + 1][x]?.dataset.access != 3
			)
				validList.push({ nextX: x, nextY: y + 1 });
			if (
				!!maze[y] &&
				maze[y][x + 1]?.dataset.access != 2
				// && maze[y][x + 1]?.dataset.access != 3
			)
				validList.push({ nextX: x + 1, nextY: y });
			if (
				!!maze[y] &&
				maze[y][x - 1]?.dataset.access != 2
				// && maze[y][x - 1]?.dataset.access != 3
			)
				validList.push({ nextX: x - 1, nextY: y });
			return validList;
		},
		(maze, [x, y]) => {
			if (maze[y][x]) maze[y][x].dataset.access = 2;
			maze[y][x]?.classList.add('visited');
			return [x, y];
		},
		(ms) => {
			return new Promise((resolve) => setTimeout(resolve, ms));
		},
	];

	const [endX, endY] = [3, 6];

	const router = (maze, [x, y]) => {
		validNext(maze, [x, y]).map(async (way) => {
			const { nextX, nextY } = way;
			await sleep(500);
			maze[nextY][nextX]?.classList.add('next');
			if ((nextX == endX && nextY == endY) || (x == endX && y == endY)) {
				console.count('FINISH');
				console.time('FINISH');
				console.timeLog('FINISH');
				console.timeEnd('FINISH');
				return 'finish';
			}
			go(maze, [nextX, nextY]);
			maze[y][x]?.classList.add('active');
			return router(maze, [nextX, nextY]);
		});
	};

	console.log(router(rows, [6, 1]));
})();
