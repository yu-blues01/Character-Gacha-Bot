function checkUserData(table, userId) {
  // シートの一列目(ユーザIDを記録している列)を検索して、何行目かを記録
  var userIndex = -1; // 見つからなかった場合は-1
  
  for (let row = 0; row < table.length; row++) {
    if ( table[row][0] === userId ) {
      userIndex = row; // 見つかった場合行数を記録
      break;
    };
  };

  return userIndex;
}
