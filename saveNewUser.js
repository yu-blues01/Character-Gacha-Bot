function saveNewUser(tmp) {
  // Spreadsheetファイルを開く
  const SHEET_URL = 'your sheet url';
  const SHEET_NAME = 'シート1';
  var spreadSheet = SpreadsheetApp.openByUrl(SHEET_URL);
  // Sheetを開く
  var sheet = spreadSheet.getSheetByName(SHEET_NAME);
  // シートの末尾に新しい行を追加
  sheet.appendRow(tmp);
}

