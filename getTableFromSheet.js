function getTableFromSheet() {
  // Spreadsheetファイルを開く
  const SHEET_URL = 'your sheet url';
  const SHEET_NAME = 'シート1';
  var spreadSheet = SpreadsheetApp.openByUrl(SHEET_URL);
  // Sheetを開く
  var sheet = spreadSheet.getSheetByName(SHEET_NAME);
  // セルの範囲を指定・値の取得
  var table = sheet.getDataRange().getValues();
  // 結果を表示
  return table;
}