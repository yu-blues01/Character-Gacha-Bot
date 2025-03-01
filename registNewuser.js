function registNewUser( table, userId, messages ) {
  // 初期設定：全てのキャラクタ所持状況を×埋め
  var tmp = new Array(( table[0].length )).fill('×');
  tmp[0] = userId; // 配列の先頭をuserIdに変更
  saveNewUser(tmp);

  messages.push({
    'type': 'text',
    'text': 'ユーザ登録を行いました！\nまずは「所持状況の確認/所持状況の変更」を実行し、お手持ちの刀剣男士のデータを登録してからbotをご利用ください！'
  });

  return messages;
}
