'use strict';

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.onclick = () => {
  console.log('ボタンが押されました。');
  const userName = userNameInput.value;
  if (userName.length === 0) {
    return;
  }
  // 診断結果表示エリアをクリア
  resultDivision.innerText = '';

  // 診断結果表示エリアの作成
  const header = document.createElement("h2");
  header.innerText = "⭐️ 診断結果 ⭐️";
  resultDivision.appendChild(header);

  const paragraph = document.createElement("p");
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivision.appendChild(paragraph);

  tweetDivision.innerText = '';
  const anchor = document.createElement('a');
  const hrefValue =
    `https://twitter.com/intent/tweet?button_hashtag=${encodeURIComponent("あなたのいいところ")}&ref_src=twsrc%5Etfw`;

  anchor.setAttribute('href', hrefValue);
  anchor.setAttribute('class', 'twitter-hashtag-button');
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのいいところ';

  tweetDivision.appendChild(anchor);

  const script = document.createElement('script');
  script.setAttribute('src', "https://platform.twitter.com/widgets.js");
  tweetDivision.appendChild(script);
};

const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはその全てです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。',
  '###userName###のいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒やされています。',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */

function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  const result = answers[index];
  const resultWithUserName = result.replaceAll('###userName###', userName + ' さん ');

  return resultWithUserName;
}

let enterPressCount = 0; // Enterキーの押下回数をカウント

userNameInput.onkeydown = event => {
  console.log(event.key);

  if (event.key === 'Enter') {
    enterPressCount++; // Enterキーが押されるたびにカウントを増やす
    console.log(`Enter pressed ${enterPressCount} times`);

    if (enterPressCount === 2) { // 2回押されたら診断ボタンのクリックイベントを実行
      enterPressCount = 0; // カウントをリセット
      assessmentButton.click(); // 診断ボタンをクリックしたのと同じ動作をさせる
    }
  } else {
    enterPressCount = 0; // Enter以外のキーを押したらリセット
  }
};


/*
let testName = '太郎';
let first = console.assert(
  assessment(testName) ===
  '太郎 さん のいいところは決断力です。太郎 さん がする決断にいつも助けられる人がいます。',
  "エラー"
);

let second = console.assert(
  assessment(testName) ===
  '太郎 さん のいいところは決断力です。太郎 さん がする決断にいつも助けられる人がいます。',
  "エラー"
);

let third = console.assert(
  assessment(testName) ===
  '太郎 さん のいいところは決断力です。太郎 さん がする決断にいつも助けられる人がいます。',
  "エラー"
);

if (first === second && second === third) {
  console.log('True');
}
*/
