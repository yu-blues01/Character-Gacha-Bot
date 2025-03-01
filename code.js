// LINE Messaging APIのアクセストークン
var CHANNEL_ACCESS_TOKEN = 'your access token';

var toukenLiNameList = getToukenName();

// 刀剣男士の名前に対応する画像のURL
// 「file/d/」を「uc?export=view&id=」に、「/view?usp=drivesdk」を「」に置換する
const toukenImages_full = getToukenImage_full();
const toukenImages_small = getToukenImage_small();

// 数字→アルファベット変換
const num2collet = (num) => {
  let p;
  if(num > 26) {
    const r = num % 26;
    p = `${num2collet((num - r) / 26)}${String.fromCharCode(64+r)}`
  } else {
    const r = num % 26;
    p = `${String.fromCharCode(64+r)}`;
  };
  return p;
};

/*
// 例: メッセージを送るユーザーのIDとメッセージ内容
const messageText = 'こんにちは！これはプッシュメッセージです。';
var userId = 'Ueb03ab343ef0a9ca90ec33432876ca68'
// メッセージを送信
sendPushMessage(userId, messageText);
*/

// LINE Webhookからのリクエストを受け取る
function doPost(e) {
  // リクエストの内容をパース
  var json = JSON.parse(e.postData.contents);
  const event = json.events[0];
  const eventType = event.type; // イベントタイプの取得
  const userId = event.source.userId; // ユーザーのID取得
  var messages = []; // メッセージの配列を作成
  const replyToken = event.replyToken; // リプライトークンの取得

  //if (userId === 'Ueb03ab343ef0a9ca90ec33432876ca68') {
    // 友達登録時のフォローイベント
    if (eventType === 'follow'){
      console.log('こんにちは！　フォローありがとうございます');
      botFirstIntroduct(replyToken, messages);
    }

    // メッセージ受信時のイベント
    else if ( eventType === 'message' && event.message.type === 'text' ) {
      var userMessage = event.message.text; // ユーザーのメッセージ内容を取得

      // スプレッドシートからデータを取得
      var table = getTableFromSheet();

      // シートの一列目(ユーザIDを記録している列)を検索して、何行目かを記録
      var userIndex = checkUserData(table, userId);


      if ( userIndex === -1 ) { // 一致するユーザIDがシートに記録されていないとき、userIndexは-1になる
        // 初期設定：全てのキャラクタ所持状況を×埋め
        messages = registNewUser(table, userId, messages);
        botFirstIntroduct(replyToken, messages);

      } else {
        // メッセージの内容に応じた分岐
        if ( userMessage === '説明' ) {
          botIntroduct(replyToken, messages);
          
        } else if ( userMessage === '所持状況の確認' ) {
          outputStatus(table, userIndex, messages, replyToken, 'True' );
          
        } else if ( userMessage === '所持状況の変更' ) {
          messages.push({
            'type': 'text',
            'text': '刀の所持状況情報の変更を行います。\n変更したい情報を以下のフォーマットに従って入力し、送信してください（複数入力可）\n\n刀剣男士名：○（所持の場合）/×（未所持の場合）\n\n（例）\n三日月宗近：○\n小狐丸：×'
          });

          tmp = {
                  'type': 'template',
                  'altText': 'Bot機能のメニューです',
                  'template': {
                    'type': 'buttons',
                    //'thumbnailImageUrl': 'https://example.com/image.jpg', // 任意の画像URL
                    'title': '所持状況の確認',
                    'text': '現在登録されている所持状況を確認する場合は下記のボタンを押下してください',
                    'actions': [
                      {
                        'type': 'message',
                        'label': '所持状況の確認',
                        'text': '所持状況の確認'
                      }
                    ]
                  }
                };

          messages.push(tmp);
          replyMessages(replyToken, messages);
          //outputStatus(table, userIndex, messages, replyToken, 'False' );

        } else if ( userMessage === '番長ガチャ' ) { // メッセージの内容に応じた分岐
          chooseBancho(table, userIndex, messages, replyToken, userId);

        } else if ( userMessage === '刀ガチャ' ) {
          chooseRandomOne(table, userIndex, messages, toukenImages_full, toukenImages_small, replyToken);

        } else if ( userMessage.includes('：') ) {
          var char = '：';
          const parts = userMessage.split(/\r\n|\n/); // 分割した文字列を保存する配列

          for ( let i = 0; i < parts.length; i++ ) {
            var content = parts[i].split(char);
            
            for (let col = 1; col < table[userIndex].length; col++) {
              if ( table[0][col] === content[0] ) {
                if ( content[1] === '○' || content[1] === '×' ) {
                  table[userIndex][col] = content[1];

                } else {
                  messages.push({
                    'type': 'text',
                    'text': '異常値を検出したため登録を中断します。\n登録する情報はフォーマットに沿って正確に記載してください'
                  });
                  replyMessages(replyToken, messages);
                };
              };
            };
          };

          // Spreadsheetファイルを開く
          const SHEET_URL = 'your sheet url';
          const SHEET_NAME = 'シート1';
          var spreadSheet = SpreadsheetApp.openByUrl(SHEET_URL);
          // Sheetを開く
          var sheet = spreadSheet.getSheetByName(SHEET_NAME);

          var sheetRow = num2collet(table[userIndex].length); // 最終列名の取得
          var sheetRange = 'A'+(userIndex+1)+':'+(sheetRow)+(userIndex+1); // セルを一列選択

          var range = sheet.getRange(sheetRange);
          var values = range.setValues([table[userIndex]]);

          messages.push({
            'type': 'text',
            'text': '登録完了'
          });
          
          outputStatus(table, userIndex, messages, replyToken, 'True' );

        } else {
          messages = addButtonMessageToUser(messages);
          replyMessages(replyToken, messages);
        };
      };
    } else {
      botIntroduct(replyToken, messages);
    };

  /*
  } else {
    messages.push({
      'type': 'text',
      'text': '現在メンテナンス中です！'
    });
    replyMessages(replyToken, messages);
  };
  */
  // HTTPレスポンスのステータスコード200（成功）を返す
  return ContentService.createTextOutput(JSON.stringify({ 'content': 'post ok' })).setMimeType(ContentService.MimeType.JSON);
}

function sendScheduledMessage() {
  // 送信したいユーザーIDのリストを取得する
  // 例: スプレッドシートから取得する場合
  var table = getTableFromSheet();
  var userIds = [];
  
  // ユーザーIDを抽出 (Aカラムに保存されていると仮定)
  for(var i = 1; i < table.length; i++) {
    if(table[i][0] && table[i][0] !== "") {
      userIds.push(table[i][0]);
    }
  }
  
  // 送信するメッセージを作成
  var messageText = "定期お知らせメッセージです！本月の番長ガチャ結果です";
  
  // 各ユーザーにメッセージを送信
  for(var i = 0; i < userIds.length; i++) {
    sendPushMessage(userIds[i], messageText);
    // Google Apps Scriptの実行制限に引っかからないよう少し待機
    Utilities.sleep(1000);
  }
  
  Logger.log("定期メッセージ送信完了: " + userIds.length + "人のユーザーに送信しました");
}

function sendScheduledBanchoGacha() {
  // スプレッドシートからデータを取得
  var table = getTableFromSheet();
  
  // 送信したいユーザーIDのリストを取得
  var userIds = [];
  
  // ユーザーIDとそのインデックスを抽出
  for(var i = 1; i < table.length; i++) {
    if(table[i][0] && table[i][0] !== "") {
      userIds.push({
        userId: table[i][0],
        index: i
      });
    }
  }
  
  // 各ユーザーに番長ガチャの結果を送信
  for(var i = 0; i < userIds.length; i++) {
    var userId = userIds[i].userId;
    var userIndex = userIds[i].index;
    
    // 番長ガチャの結果用のメッセージ配列
    var messages = [];
    
    try {
      // 番長ガチャの処理を実行
      // 注意: replyTokenが不要なため、nullや空文字を渡す
      messages = chooseBanchoNotoken(table, userIndex, messages, userId);
      
      // 生成されたメッセージを確認
      if(messages.length > 0) {
        // LINE Messaging APIのPush Messageエンドポイントを使用してメッセージを送信
        sendPushMessagesArray(userId, messages);
        Logger.log("番長ガチャ結果送信成功: " + userId);
      } else {
        Logger.log("番長ガチャでメッセージが生成されませんでした: " + userId);
      }
    } catch(e) {
      Logger.log("番長ガチャの実行中にエラーが発生しました: " + e + " ユーザーID: " + userId);
    }
    
    // Google Apps Scriptの実行制限に引っかからないよう少し待機
    Utilities.sleep(1000);
  }
}

function sendPushMessagesArray(userId, messagesArray) {
  var url = 'https://api.line.me/v2/bot/message/push';
  var headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
  };
  
  var postData = {
    'to': userId,
    'messages': messagesArray
  };
  
  var options = {
    'method': 'post',
    'headers': headers,
    'payload': JSON.stringify(postData)
  };
  
  try {
    var response = UrlFetchApp.fetch(url, options);
    return response;
  } catch(e) {
    Logger.log("メッセージ配列送信エラー: " + e);
    return null;
  }
}