function outputStatus( table, userIndex, messages, replyToken, menuflag ) {
  var tmp_msg = ''
  for ( let col = 1; col < table[userIndex].length; col++ ) {
    tmp_msg = tmp_msg + table[0][col] + '：' + table[userIndex][col] + '\n';
  }

  messages.push({
    'type': 'text',
    'text': '登録されている所持状況を出力します。\n○：所持\t\t×：未所持'
  });

  messages.push({
    'type': 'text',
    'text': tmp_msg
  });
  if (menuflag === 'True' ){
    messages = addButtonMessageToUser(messages);
  };
  replyMessages( replyToken, messages );

}
