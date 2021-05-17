const _dirs = {
	TOP: { x: 0, y: -1 },
	LEFT: { x: -1, y: 0 },
	RIGHT: { x: 1, y: 0 },
	BOTTOM: { x: 0, y: 1 },
};
const _runner = { pos: { x: 1, y: 1 }, currentElement: null };
const dirs = (dir = 'right', x, y) => {
	let _x = _dirs[dir].x + x;
	let _y = _dirs[dir].y + y;
	return { x: _x, y: _y };
};
const keybind = (key, action) => {
	window.addEventListener(
		'keydown',
		function (ev) {
			return String(ev.key).toLowerCase() === key ||
				String(ev.code).toLowerCase() === key
				? action.bind(this)()
				: null;
		},
		false,
	);
};
const select = (x, y) => {
	return _runner.app.children[y].children[x];
};
const current = (type = 'start') => {
	_runner.currentElement.classList.remove('mz__box--block');
	_runner.currentElement.classList.remove('mz__box--way');
	_runner.currentElement.classList.add('mz__box--start');
	_runner.currentElement.dataset.type = type;
};
const availabeCheck = () => {
	const { x: c_x, y: c_y } = _runner.pos;
	_runner.prev = { x: c_x, y: c_y };
	const { x: t_x, y: t_y } = dirs('TOP', c_x, c_y);
	const { x: b_x, y: b_y } = dirs('BOTTOM', c_x, c_y);
	const { x: l_x, y: l_y } = dirs('LEFT', c_x, c_y);
	const { x: r_x, y: r_y } = dirs('RIGHT', c_x, c_y);
	let _TOP = select(t_x, t_y);
	let _BOTTOM = select(b_x, b_y);
	let _LEFT = select(l_x, l_y);
	let _RIGHT = select(r_x, r_y);
	_TOP = _TOP.classList.contains('mz__box--block') ? undefined : _TOP;
	_BOTTOM = _BOTTOM.classList.contains('mz__box--block')
		? undefined
		: _BOTTOM;
	_LEFT = _LEFT.classList.contains('mz__box--block') ? undefined : _LEFT;
	_RIGHT = _RIGHT.classList.contains('mz__box--block') ? undefined : _RIGHT;
	let _available = {};
	if (!!_TOP) _available.TOP = { x: t_x, y: t_y };
	if (!!_BOTTOM) _available.BOTTOM = { x: b_x, y: b_y };
	if (!!_LEFT) _available.LEFT = { x: l_x, y: l_y };
	if (!!_RIGHT) _available.RIGHT = { x: r_x, y: r_y };
	_runner.availables = _available;
	console.log(_runner.availables);
	return _available;
};
const unselect = () => {
	let prev = select(_runner.prev.x, _runner.prev.y);
	if (prev) {
		prev.classList.remove('mz__box--start');
		prev.classList.add('mz__box--way');
	}
};
const runner = async (app, maze) => {
	_runner.app = app;
	availabeCheck();
	keybind('arrowup', () => {
		let { TOP } = availabeCheck();
		if (TOP) {
			unselect();
			selected = select(TOP.x, TOP.y);
			_runner.pos.x = TOP.x;
			_runner.pos.y = TOP.y;
			_runner.currentElement = selected;
			current('current');
		}
	});

	keybind('arrowdown', () => {
		let { BOTTOM } = availabeCheck();
		if (BOTTOM) {
			unselect();
			selected = select(BOTTOM.x, BOTTOM.y);
			_runner.pos.x = BOTTOM.x;
			_runner.pos.y = BOTTOM.y;
			_runner.currentElement = selected;
			current('current');
		}
	});

	keybind('arrowleft', () => {
		let { LEFT } = availabeCheck();
		if (LEFT) {
			unselect();
			selected = select(LEFT.x, LEFT.y);
			_runner.pos.x = LEFT.x;
			_runner.pos.y = LEFT.y;
			_runner.currentElement = selected;
			current('current');
		}
	});

	keybind('arrowright', () => {
		let { RIGHT } = availabeCheck();
		if (RIGHT) {
			unselect();
			selected = select(RIGHT.x, RIGHT.y);
			_runner.pos.x = RIGHT.x;
			_runner.pos.y = RIGHT.y;
			_runner.currentElement = selected;
			current('current');
		}
	});
};

export { runner, unselect, availabeCheck, current, select, keybind, dirs };
