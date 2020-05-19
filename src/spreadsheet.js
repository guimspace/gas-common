/**
 * Copyright (c) 2019 Guilherme T Maeoka
 * This code is licensed under MIT license.
 * <https://github.com/guimspace/gas-common>
 */

function copySheetsFromTemplate_() {
	var source = SpreadsheetApp.openById("SPREADSHEET_ID");
	var destination = SpreadsheetApp.getActiveSpreadsheet();
	const sheets = [ "foo", "bar" ];

	for (var i = 0; i < sheets.length; i++) {
		if (destination.getSheetByName(sheets[i])) continue;

		source.getSheetByName(sheets[i])
			.copyTo(destination)
			.setName(sheets[i]);
	}
}


function deleteAllSheets_() {
	var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	var sheets = spreadsheet.getSheets();

	sheets[0].showSheet();
	spreadsheet.setActiveSheet(sheets[0]);

	for (var i = 1; i < sheets.length; i++) {
		spreadsheet.deleteSheet(sheets[i]);
	}

	spreadsheet.insertSheet();
	spreadsheet.deleteSheet(sheets[0]);
}


function isMissingSheet() {
	var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	const sheets = [ "foo", "bar" ];

	for (var i = 0; i < sheets.length; i++) {
		if (! spreadsheet.getSheetByName(sheets[i])) return true;
	}

	return false;
}


function rollA1Notation(posRow, posCol, height, width, mode1, mode2) {
	if (!posRow || !posCol) return;
	if (!height) height = 1;
	if (!width) width = 1;
	if (!mode1) mode1 = 1;
	if (!mode2) mode2 = 1;

	posCol--;
	width--;
	mode1--;
	mode2--;

	var str, c, m;

	const f_ = 26;
	const s_ = 4;

	m = mode1%s_;
	str = ((m === 1 || m === 3) ? "$" : "");

	c = (posCol - posCol%f_)/f_;
	str += (c ? String.fromCharCode(64 + c) : "");
	str += String.fromCharCode(65 + posCol%f_);

	str += (m >= 2 ? "$" : "");
	str += posRow;


	if (height === 1 && width === 0) return str;
	else {
		str += ":";
		posCol += width;

		m = mode2%s_;
		str += ((m === 1 || m === 3) ? "$" : "");

		c = (posCol - posCol%f_)/f_;
		str += (c ? String.fromCharCode(64 + c) : "") ;
		str += String.fromCharCode(65 + posCol%f_);

		if (height !== -1) {
			str += (m >= 2 ? "$" : "");
			str += posRow + height - 1;
		}
	}

	return str;
}
