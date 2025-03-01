function botIntroduct(replyToken, messages) {
  messages.push({
    'type': 'text',
    'text': 'こんにちは！　Touken Gacha botです！\nこのbotには以下のような機能があります\n\n・所持状況の確認\n刀の所持状況情報を確認できます\n\n・所持状況の変更\n刀の所持状況情報アップデートすることができます\n\n・番長ガチャ\n番長を所持している刀からランダムに選びます\n\n・刀ガチャ\n所持している刀からランダムに一振り選びます'
  });
  
  replyMessages(replyToken, messages);
  
}

function botFirstIntroduct(replyToken, messages) {
  messages.push({
    'type': 'text',
    'text': 'こんにちは！　Touken Gacha botです！\nこのbotには以下のような機能があります\n\n・所持状況の確認\n刀の所持状況情報を確認できます\n\n・所持状況の変更\n刀の所持状況情報アップデートすることができます\n\n・番長ガチャ\n番長を所持している刀からランダムに選びます\n\n・刀ガチャ\n所持している刀からランダムに一振り選びます'
  });
  
  messages = addButtonMessageToUser(messages);

  replyMessages(replyToken, messages);
  
}
