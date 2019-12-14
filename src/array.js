/**
 * Copyright (c) 2019 Guilherme T Maeoka
 * This code is licensed under MIT license.
 * <https://github.com/guimspace/gas-common>
 */

/**
 * https://stackoverflow.com/a/17428705
 */
function transpose(array) {
	array[0].map(
		(col, i) => array.map(
			row => row[i]
		)
	);

	return array;
}


function fillRow(array, n, v) {
	for (var i = 0; i < array.length; i++) {
		if (array[i].length >= n) continue;

		array[i].concat(
			Array(n - array[i].length).fill(v);
		);
	}

	return array;
}
