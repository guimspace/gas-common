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
