const _render = {
	mount: undefined,
	maze: [],
	rows: [],
};

const createRow = () => {
	const row = document.createElement('div');
	return row;
};
const createColumn = ({ type = 'block' }) => {
	let column = document.createElement('div');
	column.classList.add('mz__box');
	column.classList.add(`mz__box--${type}`);
	column.dataset.type = type;
	return column;
};
const render = async (maze) => {
	const rows = [];
	maze.forEach((row) => {
		let _row = createRow();
		let cols = [];
		row.forEach((col) => {
			let _col = createColumn({ type: col === 0 ? 'block' : 'way' });
			cols.push(_col);
			_row.appendChild(_col);
		});
		rows.push(_row);
	});
	_render.rows = rows;
	return rows;
};
const mount = async (element) => {
	_render.mount = element;
	const { rows, mount: app } = _render;
	rows.map((row) => app.appendChild(row));
	return rows.length === app.children.length;
};
