// LINEプッシュメッセージを送信する関数（テキストと画像対応）
function sendPushMessages(userId, messages) {
  const url = 'https://api.line.me/v2/bot/message/push';

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
  };
  /*
  // 12個のメッセージを5個ずつ分割して送信
  const chunkSize = 5;
  for (let i = 0; i < messages.length; i += chunkSize) {
    const messageChunk = messages.slice(i, i + chunkSize);*/
  // 送信データの構築
  const postData = {
    'to': userId,
    'messages': messages.map(item => {
      // メッセージタイプに応じて適切なフォーマットに変換
      switch (item.type) {
        case 'text':
          return {
            'type': 'text',
            'text': item.content
          };
        case 'image':
          return {
            'type': 'image',
            'originalContentUrl': item.content,
            'previewImageUrl': item.preview || item.content // プレビュー未指定時はオリジナル画像を使用
          };
        default:
          Logger.log(`Unsupported message type: ${item.type}`);
          return null;
      }
    }).filter(item => item !== null) // null項目を除外
  };
  
  // APIリクエストのオプションを設定
  const options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(postData)
  };

  try {
    // LINE Messaging APIにリクエストを送信
    const response = UrlFetchApp.fetch(url, options);
    Logger.log(response.getContentText());

  } catch (e) {
    // エラーが発生した場合はログに記録
    Logger.log('Error: ' + e.toString());
  }

  // レートリミット対策として1秒待機
  Utilities.sleep(1000); // 次の送信まで1秒待機
}
//}