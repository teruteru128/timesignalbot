
const random = require('./random');


const INITIAL_CAT_LIST = ['にゃーん', 'にゃん', 'にゃ？', 'にゃん？', 'にゃおーん', 'フシーッ！'];
const CAT_EMOJIS = ['🐱', '🐈', '🐈‍⬛', '😿', '😻', '😹', '😽', '😾', '🙀', '😸', '😺', '😼', '🐾'];
const GENBA_NEKO = ['ヨシ！', 'どうして……', 'どうして\n夜中に\n起きてるん\nですか？', 'ああああ！\nああああ！\nあああああ！あー！',
  'オレじゃない\nアイツがやった\nシらない\nスんだこと', 'なんだか\n知らんが\nとにかく\nヨシ！', '100万回死んだねこ',
  'え！！半分の人員で倍の仕事を！？', '弊社なら年内施工も可能です！', 'どうして自分が指定した時間にいないんですか:anger:',
  'よくわからんが、まぁ動いてるからヨシ！', '正月もGWもお盆も普通に働いていた奴らだ。面構えが違う。'];

const A = '44GC44GL44GX44GR44CA44KE44Gq44GS44CA57eL6Imy44Gu6bOl44KI44CA44GP44GV44Gv44G/44Gt44Gv44G/44CA44GR44KS44Gu44Gw44Gb';

function choiceCat() {
    const LIST_OF_CANDIDATE_CATS = [];
    LIST_OF_CANDIDATE_CATS.splice(LIST_OF_CANDIDATE_CATS.length, 0, ...INITIAL_CAT_LIST);
    if (random.nextFloat() < 0.00682556629180908203125) {
        // 114514/16777216
      LIST_OF_CANDIDATE_CATS.push(Buffer.from(A, 'base64').toString());
    }
    if (random.nextFloat() < 0.046875) {
      // 3/64
      LIST_OF_CANDIDATE_CATS.push('ねこですよろしくおねがいします');
      LIST_OF_CANDIDATE_CATS.push('https://www.nicovideo.jp/watch/sm31931584');
    }
    if (random.nextFloat() < 0.25) {
      // 1/4
      LIST_OF_CANDIDATE_CATS.push('(\\*´ω`\\*)にゃ～ん❤');
    }
    CAT_EMOJIS.reduce((candiCatsList, candiCat, i, a) => { if (random.nextFloat() < 0.25) { candiCatsList.push(candiCat); } return candiCatsList; }, LIST_OF_CANDIDATE_CATS);
    GENBA_NEKO.reduce((candiCatsList, candiCat, i, a) => { if (random.nextFloat() < 0.1015625) { candiCatsList.push(candiCat); } return candiCatsList; }, LIST_OF_CANDIDATE_CATS);
    return LIST_OF_CANDIDATE_CATS[random.nextInt(LIST_OF_CANDIDATE_CATS.length)];
}

module.exports.choiceCat = choiceCat;
