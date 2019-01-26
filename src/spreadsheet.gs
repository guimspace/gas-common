function copySheetsFromTemplate_() {
  var spreadsheetTemplate = SpreadsheetApp.openById('spreadsheet_id'),
      spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var listSheets = [ 'foo', 'bar' ];
  var i;


  for(i = 0;  i < listSheets.length;  i++) {
    spreadsheetTemplate.getSheetByName(listSheets[i])
      .copyTo(spreadsheet)
      .setName(listSheets[i]);
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
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(),
      sheet;
  var list = [ ];
  var i;


  for(i = 0;  i < list.length;  i++) {
    sheet = spreadsheet.getSheetByName(list[i]);
    if(!sheet) return true;
  }

  return false;
}
