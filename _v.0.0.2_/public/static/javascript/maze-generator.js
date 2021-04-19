(function () {
	const [rows_count, places_count] = [7, 7],
		[div, board, range] = [
			document.createElement('div'),
			document.getElementById('board'),
			Array.from(Array(7).keys()),
		];
	const [places, place, rows, row] = [
		[],
		div.cloneNode(true),
		[],
		div.cloneNode(),
	];
	place.classList.add('board__place');
	place.classList.add('board__place--wall');
	row.classList.add('board__row');

	range.forEach(() => places.push(place.cloneNode(true)));
	places.forEach((place) => row.appendChild(place));
	range.forEach((y) => {
		Array.from(row.children).forEach((place, x) => {
			place.dataset.x = x;
			place.dataset.y = y;
			place.id = `_place_${x}_${y}_`;
		});
		rows.push(row.cloneNode(true));
	});
	rows.forEach((row) => board.appendChild(row));
	let author = document.createElement('div');
	author.dataset.me = 'author';
	console.log(author.dataset);
})();
