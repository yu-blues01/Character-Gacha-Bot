// 重複のないn個のランダムな数字を生成する関数
function getRandomNumbers(n, max) {
  // 0からmaxまでの連続する数字のリストを作成
  var numbers = [];
  for (var i = 0; i <= (max-1); i++) {
    numbers.push(i);
  };

  // フィッシャー–イェーツのシャッフルアルゴリズムでリストをシャッフル
  for (var i = numbers.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = numbers[i];
    numbers[i] = numbers[j];
    numbers[j] = temp;
  };

  // シャッフルされたリストの最初のn個を返す
  return numbers.slice(0, n);
}