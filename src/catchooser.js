
const random = require('./random');


const INITIAL_CAT_LIST = ['にゃーん', 'にゃん', 'にゃ？', 'にゃん？', 'にゃおーん', 'フシーッ！', 'ゴロゴロゴロゴロ……', 'Zz...', '💤', 'なぁーご', 'なぁ〜ご', 'なぉーん'];
const CAT_EMOJIS = ['🐱', '🐈', '🐈‍⬛', '😿', '😻', '😹', '😽', '😾', '🙀', '😸', '😺', '😼', '🐾'];
const GENBA_NEKO = ['ヨシ！', 'どうして……', 'どうして\n夜中に\n起きてるん\nですか？', 'ああああ！\nああああ！\nあああああ！あー！',
  'オレじゃない\nアイツがやった\nシらない\nスんだこと', 'なんだか\n知らんが\nとにかく\nヨシ！', '100万回死んだねこ',
  'え！！半分の人員で倍の仕事を！？', '弊社なら年内施工も可能です！', 'どうして自分が指定した時間にいないんですか:anger:',
  'よくわからんが、まぁ動いてるからヨシ！', '正月もGWもお盆も普通に働いていた奴らだ。面構えが違う。'];

const A = '44GC44GL44GX44GR44CA44KE44Gq44GS44CA57eL6Imy44Gu6bOl44KI44CA44GP44GV44Gv44G/44Gt44Gv44G/44CA44GR44KS44Gu44Gw44Gb';
const B = '44GC44GL44GX44GR44CA44KE44Gq44GS44CA57eL6Imy44Gu6bOl44KI44CA44GP44GV44Gv44G/44Gt44Gv44G/44CA44GR44KS44Gu44Gw44GbCuOBquOBruOBqOOAgOOBsuOBi+OBleOBmeOAgOe3i+iJsuOBrumzpeOCiOOAgOOBqOOBi+OBjeOChOOBvuOBi+OBjeOAgOOBquOCkuOBu+OBteOCjArjgZPjgYbjgZ/jgovjgIDjgarjgajjgovjgIDnt4voibLjga7ps6XjgojjgIDjgbLjgY/jgYTjgojjgb/jgY/jgYTjgIDjgZvjgY3jgajjgYrjgowKCueFjOOAheOBn+OCi+e0heOAheiNkumHjuOBq+mjn+OBv+OBl+W+oemBo+OBhOOBruebruOBq+eXheOBv+OBl+mXh+imluOBn+OCi+efouimi+OBl+OBkeOCi+OCkuS9leOBqOOBquOCiwrlj6Pop5Ljga/pmY3kuIvjgZflip/pgY7jgpLjgoLnoJXjgY3jgZ/jgovmiYDmpa3jgZPjgZ3kvZXjgZ/jgovjgoQK5YW244Gv6KiA5LmL6JGJ44Gr6Z2e44Ga5YW244Gv5aWH5oCq5LmfCuOCq+OCt+OCs+ODn+OAgOOCq+OCt+OCs+ODn+OAgOaVrOOBhOWlieOCiuW+oeawl+aAp+epj+OChOOBi+OBquOCi+OCkumhmOOBhOOBkeOCjArntIXmmJ/jgZ/jgovmmJ/nnLzjgZ/jgovnnLznmLTjgZ/jgovnmLTmsJfjgZ/jgovmsJfolqzjgZ/jgovolqzmr5LjgZ/jgovmr5LnlZzjgZ/jgovnlZznlJ/jgZ/jgovnlJ/npZ7jgZ/jgovmiJHjgonjgYzlvqHkuLvjga7lvqHpgaPjgYTjgoQK5LuK44GT44Gd5p2l44Gf44KJ44KT5oiR44GM6ISz5ry/44Gu5rCR44G4CuS7iuOBk+OBneadpeOBn+OCieOCk+aIkeOBjOS4luOBruW4uOmXh+OBuArku4rjgZPjgZ3mnaXjgZ/jgonjgpPmiJHjgYzmqrvjga7otavngbzjg5gKCue3i+iJsuOBrumzpeOCiOOAgOS7iuOBk+OBneeZuuOBoeOBrA==';

function choiceCat() {
  const LIST_OF_CANDIDATE_CATS = [];
  // 100%
  LIST_OF_CANDIDATE_CATS.splice(LIST_OF_CANDIDATE_CATS.length, 0, ...INITIAL_CAT_LIST);
  if (random.nextInt(4) < 1) {
    // 1/4
    // シークレットA
    LIST_OF_CANDIDATE_CATS.push('(\\*´ω`\\*)にゃ～ん❤');
  }
  CAT_EMOJIS.reduce((candiCatsList, candiCat, i, a) => { if (random.nextInt(4) < 1) { candiCatsList.push(candiCat); } return candiCatsList; }, LIST_OF_CANDIDATE_CATS);
  if (random.nextInt(8) < 1) {
    // 1/8
    // 毛玉吐き
    LIST_OF_CANDIDATE_CATS.push("オエッ(毛玉)");
  }
  if (random.nextInt(16) < 1) {
    // 1/16
    LIST_OF_CANDIDATE_CATS.push('は゛ぁ゛い゛ニ゛ャ゛ン゛ち゛ゅ゛う゛で゛ぇ゛す゛');
  }
  // 13/128
  GENBA_NEKO.reduce((candiCatsList, candiCat, i, a) => { if (random.nextInt(128) < 13) { candiCatsList.push(candiCat); } return candiCatsList; }, LIST_OF_CANDIDATE_CATS);
  if (random.nextInt(64) < 3) {
    // 3/64
    // シークレットB
    LIST_OF_CANDIDATE_CATS.push('ねこですよろしくおねがいします');
    LIST_OF_CANDIDATE_CATS.push('https://www.nicovideo.jp/watch/sm31931584');
  }
  if (random.nextInt(8388608) < 57257) {
    // 114514/16777216
    // シークレットC
    LIST_OF_CANDIDATE_CATS.push(Buffer.from(A, 'base64').toString());
  }
  if (random.nextInt(16777216) < 1) {
    // 114514/16777216
    // シークレットC2
    LIST_OF_CANDIDATE_CATS.push(Buffer.from(B, 'base64').toString());
  }
  return LIST_OF_CANDIDATE_CATS[random.nextInt(LIST_OF_CANDIDATE_CATS.length)];
}

module.exports.choiceCat = choiceCat;
