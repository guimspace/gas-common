/**
 * Copyright (c) 2019 Guilherme T Maeoka
 * This code is licensed under MIT license.
 * <https://github.com/guimspace/gas-common>
 */

/**
 * Returns a tabular 2D array representation of a DSV string or file.
 * @param  {String/File} source The file or DSV string.
 * @param  {String} delimiter   The delimiter between values.
 * @return {Array}              The tabular 2D representation.
 */
function parseDsvTo2DArray_(source, delimiter) {
	var data;

	if (!delimiter || delimiter == "") delimiter = ",";

	switch (typeof source) {
		case "object":
			if (source.getBlob().getContentType() !== "text/csv") return;
			source = source.getBlob().getDataAsString();
			break;
		case "string":
			break;

		default:
			return;
	}

	try {
		data = Utilities.parseCsv(source, delimiter);
	} catch (err) {
		console.error("parseDsvTo2DArray_()", err);
		return;
	}

	return data;
}

/**
 * Returns a DSV string representation of a tabular 2D array.
 * @param  {String/File} source The 2D array.
 * @param  {String} delimiter   The delimiter between values.
 * @return {Array}              The DSV string.
 */
function transform2DArrayToDsv_(data, delimiter) {
	var output, i, j;

	if (delimiter) {
		output = data[0][0];

		for (j = 1; j < data[0].length; j++) {
			output += delimiter + data[0][j];
		}

		for (i = 1; i < data.length; i++) {
			output += "\n";

			output += data[i][0];
			for (j = 1; j < data[i].length; j++) {
				output += delimiter + data[i][j];
			}
		}

	} else {
		output = data.join("\n");
	}

	return output;
}
