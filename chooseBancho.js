function chooseBancho(table, userIndex, messages, replyToken, userId) {
  // 所持している刀剣男士のみを抽出したリスト
  var havingTokenName = checkHavingStatus(table, userIndex);

  if ( havingTokenName.length >= 5 ) {
    var bancho = ['総務番長','勘定番長','教育番長','厨番長  ','清掃番長','蔵番長  ']
    var n = bancho.length;  // 取得したい乱数の個数
    var max = havingTokenName.length;  // 乱数の範囲 (0〜havingTokenName.length-1)
    var randomNumbers = getRandomNumbers(n, max);
    var replyMessage = '';
    var messages = [];

    for (var i = 0 ; i < bancho.length; i++) {
      // ランダムに選ばれた刀剣の名前を格納
      var selectedTouken = havingTokenName[randomNumbers[i]];
      var tmp = bancho[i] + '\t\: ' + selectedTouken ;
      
      //pushMessages.push({ type: 'text', content: tmp });
      //pushMessages.push({ type: 'image', content: toukenImages_full[selectedTouken], preview: toukenImages_small[selectedTouken] });
      /*
      const pushMessages = [
        { type: 'text', content: tmp },
        { type: 'image', content: toukenImages_full[selectedTouken], preview: toukenImages_small[selectedTouken] }
      ];*/

      if ( i === 0 ) {
        replyMessage =  replyMessage + tmp;
      } else {
        replyMessage =  replyMessage + '\n' + tmp;
      };
      
    };
    /*
    // 12個のメッセージを5個ずつ分割して送信
    const chunkSize = 5;
    for (let i = 0; i < messages.length; i += chunkSize) {
      const messageChunk = pushMessages.slice(i, i + chunkSize);
      sendPushMessages(userId, messageChunk);
    };*/
    // メッセージを配列に追加
    messages.push({
      'type': 'text',
      'text': replyMessage
    });

  } else {
    // メッセージを配列に追加
    messages.push({
      'type': 'text',
      'text': '所持している刀が少ないため、ガチャを回すことができません。'
    });
  };

  messages = addButtonMessageToUser(messages);
  
  // LINE Messaging APIを使って返信する
  replyMessages(replyToken, messages);

}

function chooseBanchoNotoken(table, userIndex, messages, userId) {
  // 所持している刀剣男士のみを抽出したリスト
  var havingTokenName = checkHavingStatus(table, userIndex);

  if ( havingTokenName.length >= 5 ) {
    var bancho = ['総務番長','勘定番長','教育番長','厨番長  ','清掃番長','蔵番長  ']
    var n = bancho.length;  // 取得したい乱数の個数
    var max = havingTokenName.length;  // 乱数の範囲 (0〜havingTokenName.length-1)
    var randomNumbers = getRandomNumbers(n, max);
    var replyMessage = '';
    var messages = [];

    for (var i = 0 ; i < bancho.length; i++) {
      // ランダムに選ばれた刀剣の名前を格納
      var selectedTouken = havingTokenName[randomNumbers[i]];
      var tmp = bancho[i] + '\t\: ' + selectedTouken ;
      
      //pushMessages.push({ type: 'text', content: tmp });
      //pushMessages.push({ type: 'image', content: toukenImages_full[selectedTouken], preview: toukenImages_small[selectedTouken] });
      /*
      const pushMessages = [
        { type: 'text', content: tmp },
        { type: 'image', content: toukenImages_full[selectedTouken], preview: toukenImages_small[selectedTouken] }
      ];*/

      if ( i === 0 ) {
        replyMessage =  replyMessage + tmp;
      } else {
        replyMessage =  replyMessage + '\n' + tmp;
      };
      
    };
    /*
    // 12個のメッセージを5個ずつ分割して送信
    const chunkSize = 5;
    for (let i = 0; i < messages.length; i += chunkSize) {
      const messageChunk = pushMessages.slice(i, i + chunkSize);
      sendPushMessages(userId, messageChunk);
    };*/
    // メッセージを配列に追加
    messages.push({
      'type': 'text',
      'text': replyMessage
    });

  } else {
    // メッセージを配列に追加
    messages.push({
      'type': 'text',
      'text': '所持している刀が少ないため、ガチャを回すことができません。'
    });
  };

  messages = addButtonMessageToUser(messages);
  
  return  messages;

}
