const _render = {
	mount: undefined,
	maze: [],
	rows: [],
};

const createRow = () => {
	const row = document.createElement('div');
	row.classList.add('mz__row');
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
const setClass = (el, cls) => {
	el.classList.remove('mz__box--block');
	el.classList.remove('mz__box--way');
	el.classList.add(`mz__box--${cls}`);
	el.dataset.type = cls;
};
const mount = async (element, { start = [1, 1], end }) => {
	_render.mount = element;
	const { rows, mount: app } = _render;
	rows.map((row) => app.appendChild(row));
	let [start_x, start_y] = start;
	let [end_x, end_y] = end;
	setClass(rows[start_x].children[start_y], 'start');
	setClass(rows[end_x].children[end_y], 'end');
	return rows.length === app.children.length;
};
