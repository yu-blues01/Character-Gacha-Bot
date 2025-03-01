function addButtonMessageToUser(messages) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  
  var tmp = {
        'type': 'template',
        'altText': 'Bot機能のメニューです',
        'template': {
          'type': 'buttons',
          //'thumbnailImageUrl': 'https://example.com/image.jpg', // 任意の画像URL
          'title': 'Bot機能メニュー',
          'text': '下記のボタンから選択してください\n\n各機能の詳細が知りたい場合\n「説明」と送信してください',
          'actions': [
            {
              'type': 'message',
              'label': '所持状況の確認',
              'text': '所持状況の確認'
            },
            {
              'type': 'message',
              'label': '所持状況の変更',
              'text': '所持状況の変更'
            },
            {
              'type': 'message',
              'label': '番長ガチャ',
              'text': '番長ガチャ'
            },
            {
              'type': 'message',
              'label': '刀ガチャ',
              'text': '刀ガチャ'
            }
          ]
        }
      };

  messages.push(tmp);

  return messages;
}