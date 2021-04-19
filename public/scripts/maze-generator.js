const generator = (rows = 33, columns = 33) => {
	let maze = [];
	let dirs = [
		{ x: -2, y: 0 },
		{ x: 0, y: -2 },
		{ x: 2, y: 0 },
		{ x: 0, y: 2 },
	];
	let goal = {};

	const init = () => {
		maze = maze.slice(0, 0);
		for (let x = 0; x < columns; ++x) {
			maze.push([]);
			for (let y = 0; y < rows; ++y) {
				maze[x].push(0);
			}
		}

		let head = { x: 1, y: 1 };
		let stack = [];
		let furthest = {
			stackLen: 0,
			cell: head,
		};

		maze[1][1] = 1;

		do {
			let available = [
				{ x: head.x + dirs[0].x, y: head.y + dirs[0].y, i: 0 },
				{ x: head.x + dirs[1].x, y: head.y + dirs[1].y, i: 1 },
				{ x: head.x + dirs[2].x, y: head.y + dirs[2].y, i: 2 },
				{ x: head.x + dirs[3].x, y: head.y + dirs[3].y, i: 3 },
			].filter(
				(coord) =>
					coord.x > 0 &&
					coord.x < w &&
					coord.y > 0 &&
					coord.y < h &&
					maze[coord.x][coord.y] === 0,
			);

			if (available.length > 0) {
				stack.push(head);
				var nextHead =
					available[(Math.random() * available.length) | 0];
				maze[(head.x + nextHead.x) / 2][(head.y + nextHead.y) / 2] = 1;
				head = nextHead;
				maze[head.x][head.y] = 1;
			} else {
				if (stack.length > furthest.stackLen) {
					furthest.stackLen = stack.length;
					furthest.cell = head;
				}
				stack.pop();
				head = stack[stack.length - 1];
			}
		} while (stack.length > 0);
		goal = furthest.cell;
		return maze;
	};

	return init();
};
module.exports = generator;
