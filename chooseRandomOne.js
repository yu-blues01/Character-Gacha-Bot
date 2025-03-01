function chooseRandomOne( table, userIndex, messages, toukenImages_full, toukenImages_small, replyToken ) {
  // 所持している刀剣男士のみを抽出したリスト
  var havingTokenName = checkHavingStatus( table, userIndex );

  if ( havingTokenName.length >= 5 ){
    // toukenListのサイズ分中からのランダムな数字を生成
    var randomNumber = Math.floor(Math.random() * (havingTokenName.length-1));
    
    // ランダムに選ばれた刀剣の名前を格納
    var selectedTouken = havingTokenName[randomNumber];
    var replyMessage = ( randomNumber+1 ) + ' : ' + selectedTouken;
    
    // メッセージを配列に追加
    messages.push({
      'type': 'text',
      'text': replyMessage
    });

    // 画像URLが存在すれば、画像メッセージも追加
    if (toukenImages_full[selectedTouken]) {
      messages.push({
        'type': 'image',
        'originalContentUrl': toukenImages_full[selectedTouken],
        'previewImageUrl': toukenImages_small[selectedTouken]
      });
    };
  } else {
    // メッセージを配列に追加
    messages.push({
      'type': 'text',
      'text': '所持している刀が少ないため、ガチャを回すことができません。'
    });
  };
  
  messages = addButtonMessageToUser(messages);
  
  // メッセージを送信
  replyMessages( replyToken, messages );
}
