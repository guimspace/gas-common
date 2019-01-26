function copySheetsFromTemplate_() {
  var spreadsheetTemplate = SpreadsheetApp.openById("spreadsheet_id"),
      spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var listSheetsTemplate = [ "foo", "bar" ];
  var i;


  for(i = 0;  i < listSheetsTemplate.length;  i++) {
    if(spreadsheet.getSheetByName(listSheetsTemplate[i])) continue;

    spreadsheetTemplate.getSheetByName(listSheetsTemplate[i])
      .copyTo(spreadsheet)
      .setName(listSheetsTemplate[i]);
  }
}


function deleteAllSheets_() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(),
      listSheets = spreadsheet.getSheets();
  var i;


  listSheets[0].showSheet();
  spreadsheet.setActiveSheet(listSheets[0]);

  for(i = 1;  i < listSheets.length;  i++) {
    spreadsheet.deleteSheet(listSheets[i]);
  }

  spreadsheet.insertSheet();
  spreadsheet.deleteSheet(listSheets[0]);
}


function isMissingSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var list = [ "foo", "bar" ];
  var i;


  for(i = 0;  i < list.length;  i++) {
    if(spreadsheet.getSheetByName(list[i]) == null) return true;
  }

  return false;
}
