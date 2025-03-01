// LINEユーザーにメッセージを返信する関数
function replyMessages(replyToken, messages) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
  };

  var postData = {
    'replyToken': replyToken,
    'messages': messages
  };

  var options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(postData)
  };

  UrlFetchApp.fetch(url, options);
}