/**
 * Copyright (c) 2019 Guilherme T Maeoka
 * This code is licensed under MIT license.
 * <https://github.com/guimspace/gas-common>
 */

function copySheetsFromTemplate_() {
	var spreadsheetTemplate = SpreadsheetApp.openById("spreadsheet_id"),
			spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	var listSheetsTemplate = [ "foo", "bar" ];

	for (var i = 0; i < listSheetsTemplate.length; i++) {
		if (spreadsheet.getSheetByName(listSheetsTemplate[i])) continue;

		spreadsheetTemplate.getSheetByName(listSheetsTemplate[i])
			.copyTo(spreadsheet)
			.setName(listSheetsTemplate[i]);
	}
}


function deleteAllSheets_() {
	var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(),
			listSheets = spreadsheet.getSheets();

	listSheets[0].showSheet();
	spreadsheet.setActiveSheet(listSheets[0]);

	for (var i = 1; i < listSheets.length; i++) {
		spreadsheet.deleteSheet(listSheets[i]);
	}

	spreadsheet.insertSheet();
	spreadsheet.deleteSheet(listSheets[0]);
}


function isMissingSheet() {
	var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	var list = [ "foo", "bar" ];

	for (var i = 0; i < list.length; i++) {
		if (spreadsheet.getSheetByName(list[i]) == null) return true;
	}

	return false;
}
