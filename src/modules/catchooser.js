const fs = require('fs');
// const { pino } = require('pino');
const random = require('./random');

// const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

// 基本猫12種
const INITIAL_CAT_LIST = ['にゃーん', 'にゃん', 'にゃ？', 'にゃん？', 'にゃおーん', 'フシーッ！', 'ゴロゴロゴロゴロ……', 'Zz...', '💤', 'なぁーご', 'なぁ〜ご', 'なぉーん'];
// 絵文字猫13種
const CAT_EMOJIS = ['🐱', '🐈', '🐈‍⬛', '😿', '😻', '😹', '😽', '😾', '🙀', '😸', '😺', '😼', '🐾'];
// 現場猫11種
const GENBA_NEKO = ['ヨシ！', 'どうして……', 'どうして\n夜中に\n起きてるん\nですか？', 'ああああ！\nああああ！\nあああああ！あー！',
  'オレじゃない\nアイツがやった\nシらない\nスんだこと', 'なんだか\n知らんが\nとにかく\nヨシ！', '100万回死んだねこ',
  'え！！半分の人員で倍の仕事を！？', '弊社なら年内施工も可能です！', 'どうして自分が指定した時間にいないんですか💢',
  'よくわからんが、まぁ動いてるからヨシ！', '正月もGWもお盆も普通に働いていた奴らだ。面構えが違う。'];
//
const CAT_KAOMOJI = [];

fs.readFile('./src/modules/catfaces.txt', 'utf-8', (err, data) => {
  if (err) throw err;
  CAT_KAOMOJI.splice(CAT_KAOMOJI.length, 0, ...data.replace('\\', '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\*/g, '\\*')
    .replace(/~/g, '\\~')
    .replace(/_/g, '\\_')
    .replace(/\|/g, '\\|')
    .split(/\n/));
});

// ??? 2種
const A = '44GC44GL44GX44GR44CA44KE44Gq44GS44CA57eL6Imy44Gu6bOl44KI44CA44GP44GV44Gv44G/44Gt44Gv44G/44CA44GR44KS44Gu44Gw44Gb';
const B = '44GC44GL44GX44GR44CA44KE44Gq44GS44CA57eL6Imy44Gu6bOl44KI44CA44GP44GV44Gv44G/44Gt44Gv44G/44CA44GR44KS44Gu44Gw44GbCuOBquOBruOBqOOAgOOBsuOBi+OBleOBmeOAgOe3i+iJsuOBrumzpeOCiOOAgOOBqOOBi+OBjeOChOOBvuOBi+OBjeOAgOOBquOCkuOBu+OBteOCjArjgZPjgYbjgZ/jgovjgIDjgarjgajjgovjgIDnt4voibLjga7ps6XjgojjgIDjgbLjgY/jgYTjgojjgb/jgY/jgYTjgIDjgZvjgY3jgajjgYrjgowKCueFjOOAheOBn+OCi+e0heOAheiNkumHjuOBq+mjn+OBv+OBl+W+oemBo+OBhOOBruebruOBq+eXheOBv+OBl+mXh+imluOBn+OCi+efouimi+OBl+OBkeOCi+OCkuS9leOBqOOBquOCiwrlj6Pop5Ljga/pmY3kuIvjgZflip/pgY7jgpLjgoLnoJXjgY3jgZ/jgovmiYDmpa3jgZPjgZ3kvZXjgZ/jgovjgoQK5YW244Gv6KiA5LmL6JGJ44Gr6Z2e44Ga5YW244Gv5aWH5oCq5LmfCuOCq+OCt+OCs+ODn+OAgOOCq+OCt+OCs+ODn+OAgOaVrOOBhOWlieOCiuW+oeawl+aAp+epj+OChOOBi+OBquOCi+OCkumhmOOBhOOBkeOCjArntIXmmJ/jgZ/jgovmmJ/nnLzjgZ/jgovnnLznmLTjgZ/jgovnmLTmsJfjgZ/jgovmsJfolqzjgZ/jgovolqzmr5LjgZ/jgovmr5LnlZzjgZ/jgovnlZznlJ/jgZ/jgovnlJ/npZ7jgZ/jgovmiJHjgonjgYzlvqHkuLvjga7lvqHpgaPjgYTjgoQK5LuK44GT44Gd5p2l44Gf44KJ44KT5oiR44GM6ISz5ry/44Gu5rCR44G4CuS7iuOBk+OBneadpeOBn+OCieOCk+aIkeOBjOS4luOBruW4uOmXh+OBuArku4rjgZPjgZ3mnaXjgZ/jgonjgpPmiJHjgYzmqrvjga7otavngbzjg5gKCue3i+iJsuOBrumzpeOCiOOAgOS7iuOBk+OBneeZuuOBoeOBrA==';

function choiceCat() {
  const base = random.nextInt(16777216);
  if (base < 5033165) {
    return INITIAL_CAT_LIST[random.nextInt(INITIAL_CAT_LIST.length)];
  }
  if (base < 9227469) {
    return CAT_EMOJIS[random.nextInt(CAT_EMOJIS.length)];
  }
  if (base < 12163482) {
    return CAT_KAOMOJI[random.nextInt(CAT_KAOMOJI.length)];
  }
  if (base < 14260634) {
    return GENBA_NEKO[random.nextInt(GENBA_NEKO.length)];
  }
  if (base < 15810733) {
    const list = ['(\\*´ω`\\*)にゃ～ん❤', 'オエッ(毛玉)', 'みゃ～？', 'みゃ！',
      'Nyanyanyanyanyanyanya!', 'は゛ぁ゛い゛ニ゛ャ゛ン゛ち゛ゅ゛う゛で゛ぇ゛す゛'];
    // 雑多
    return list[random.nextInt(list.length)];
  }
  if (base < 16597165) {
    const list = ['ねこですよろしくおねがいします', 'https://www.nicovideo.jp/watch/sm31931584'];
    // 040
    return list[random.nextInt(list.length)];
  }
  if (base < 16662701) {
    return '猫';
  }
  if (base < 16777215) {
    return Buffer.from(A, 'base64').toString();
  }
  return Buffer.from(B, 'base64').toString();
}

module.exports.choiceCat = choiceCat;
