const fs = require('fs');
const { pino } = require('pino');
const random = require('./random');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

// === 1. 猫のデータ定義（ここに新しいものを追加するだけ！） ===
// 基本猫12種
const INITIAL_CAT_LIST = ['にゃーん', 'にゃん', 'にゃ？', 'にゃん？', 'にゃおーん', 'フシーッ！', 'ゴロゴロゴロゴロ……',
  'Zz...', '💤', 'なぁーご', 'なぁ〜ご', 'なぉーん', 'ﾅｰﾝ', 'ニャアアアアン！'];
// 絵文字猫13種
const CAT_EMOJIS = ['🐱', '🐈', '🐈‍⬛', '😿', '😻', '😹', '😽', '😾', '🙀', '😸', '😺', '😼', '🐾'];

// 現場猫13種
const GENBA_NEKO = ['ヨシ！', 'どうして……', 'どうして\n夜中に\n起きてるん\nですか？', 'ああああ！\nああああ！\nあああああ！あー！',
  'オレじゃない\nアイツがやった\nシらない\nスんだこと', 'なんだか\n知らんが\nとにかく\nヨシ！', '100万回死んだねこ',
  'え！！半分の人員で倍の仕事を！？', '弊社なら年内施工も可能です！', 'どうして自分が指定した時間にいないんですか💢',
  'よくわからんが、まぁ動いてるからヨシ！', '正月もGWもお盆も普通に働いていた奴らだ。面構えが違う。', '指差し確認☜ν(ФꑣФ)วﾖｼｯ!',
  '何を見て\nヨシ！って\n言ったん\nですか？'];

// 雑多
const OTHERS = ['(\\*´ω`\\*)にゃ～ん❤', 'オエッ(毛玉)', 'みゃ～？', 'みゃ！', 'Nyanyanyanyanyanyanya!',
  'は゛ぁ゛い゛ニ゛ャ゛ン゛ち゛ゅ゛う゛で゛ぇ゛す゛', 'お゛ぉ゛ん゛', '**ね**ない**こ**だれだ', 'ﾅｰﾝ', 'ニャー！(猫ひろし)',
  'https://www.nicovideo.jp/watch/sm11509720'];
// 040
const NEKODESU = ['ねこですよろしくおねがいします', 'https://www.nicovideo.jp/watch/sm31931584'];
// 猫のお土産 3種
const GIFTS = ['🐀', '🦗', '🪳'];

// ??? 2種
const A = '44GC44GL44GX44GR44CA44KE44Gq44GS44CA57eL6Imy44Gu6bOl44KI44CA44GP44GV44Gv44G/44Gt44Gv44G/44CA44GR44KS44Gu44Gw44Gb';
const B = '44GC44GL44GX44GR44CA44KE44Gq44GS44CA57eL6Imy44Gu6bOl44KI44CA44GP44GV44Gv44G/44Gt44Gv44G/44CA44GR44KS44Gu44Gw44Gb' +
          'CuOBquOBruOBqOOAgOOBsuOBi+OBleOBmeOAgOe3i+iJsuOBrumzpeOCiOOAgOOBqOOBi+OBjeOChOOBvuOBi+OBjeOAgOOBquOCkuOBu+OBteOC' +
          'jArjgZPjgYbjgZ/jgovjgIDjgarjgajjgovjgIDnt4voibLjga7ps6XjgojjgIDjgbLjgY/jgYTjgojjgb/jgY/jgYTjgIDjgZvjgY3jgajjgYrj' +
          'gowKCueFjOOAheOBn+OCi+e0heOAheiNkumHjuOBq+mjn+OBv+OBl+W+oemBo+OBhOOBruebruOBq+eXheOBv+OBl+mXh+imluOBn+OCi+efouim' +
          'i+OBl+OBkeOCi+OCkuS9leOBqOOBquOCiwrlj6Pop5Ljga/pmY3kuIvjgZflip/pgY7jgpLjgoLnoJXjgY3jgZ/jgovmiYDmpa3jgZPjgZ3kvZXj' +
          'gZ/jgovjgoQK5YW244Gv6KiA5LmL6JGJ44Gr6Z2e44Ga5YW244Gv5aWH5oCq5LmfCuOCq+OCt+OCs+ODn+OAgOOCq+OCt+OCs+ODn+OAgOaVrOOB' +
          'hOWlieOCiuW+oeawl+aAp+epj+OChOOBi+OBquOCi+OCkumhmOOBhOOBkeOCjArntIXmmJ/jgZ/jgovmmJ/nnLzjgZ/jgovnnLznmLTjgZ/jgovn' +
          'mLTmsJfjgZ/jgovmsJfolqzjgZ/jgovolqzmr5LjgZ/jgovmr5LnlZzjgZ/jgovnlZznlJ/jgZ/jgovnlJ/npZ7jgZ/jgovmiJHjgonjgYzlvqHk' +
          'uLvjga7lvqHpgaPjgYTjgoQK5LuK44GT44Gd5p2l44Gf44KJ44KT5oiR44GM6ISz5ry/44Gu5rCR44G4CuS7iuOBk+OBneadpeOBn+OCieOCk+aI' +
          'keOBjOS4luOBruW4uOmXh+OBuArku4rjgZPjgZ3mnaXjgZ/jgonjgpPmiJHjgYzmqrvjga7otavngbzjg5gKCue3i+iJsuOBrumzpeOCiOOAgOS7' +
          'iuOBk+OBneeZuuOBoeOBrA==';
// 顔文字334種
const CAT_KAOMOJI = [];
// 顔文字リスト（非同期で読み込み）
try {
  const data = fs.readFileSync('./src/modules/catfaces.txt', 'utf-8');
  CAT_KAOMOJI.push(...data.replace('\\', '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\*/g, '\\*')
    .replace(/~/g, '\\~')
    .replace(/_/g, '\\_')
    .replace(/\|/g, '\\|')
    .split(/\n/));
} catch (err) {// 起動時にファイルが読めなかったら error ログを吐く
  logger.error(err, '顔文字ファイルの読み込みに失敗しました。顔文字枠は空になります。');
}
// ★★★ 新しく追加したいコンテンツ ★★★
const NEW_CAT_TALKS = ['猫「魚くれ」', '猫「シャワーは嫌じゃ」'];

// === 2. 各カテゴリの「重み」を設定するテーブル ===
// 元のコードの分子の数値をそのまま設定しています
const CATEGORY_WEIGHTS = [
  // 🔄 新カテゴリを足すために、元の 4771021 から 500000 枠だけ新カテゴリに譲渡
  { weight: 4271021, get: () => INITIAL_CAT_LIST[random.nextInt(INITIAL_CAT_LIST.length)] }, 
  
  { weight: 3932160, get: () => CAT_EMOJIS[random.nextInt(CAT_EMOJIS.length)] },
  { weight: 2673869, get: () => CAT_KAOMOJI[random.nextInt(CAT_KAOMOJI.length)] },
  { weight: 1835008, get: () => GENBA_NEKO[random.nextInt(GENBA_NEKO.length)] },
  { weight: 1550099, get: () => OTHERS[random.nextInt(OTHERS.length)] },
  { weight: 1048576, get: () => `お土産→${GIFTS[random.nextInt(GIFTS.length)]}` },
  { weight: 786432,  get: () => NEKODESU[random.nextInt(NEKODESU.length)] }, // SCP-040-JP
  { weight: 114514,  get: () => Buffer.from(A, 'base64').toString() },       // SCP-444-JP
  { weight: 65536,   get: () => '猫' },
  
  // 🐾 譲り受けた 500000 枠（約2.98%）で新カテゴリを綺麗に追加！
  { weight: 500000,  get: () => NEW_CAT_TALKS[random.nextInt(NEW_CAT_TALKS.length)] },
  
  // 💎 これで「ヒミツ」は狙い通り完全に 1 / 16777216（0.00000596%）になります
  { weight: 1,       get: () => Buffer.from(B, 'base64').toString() },
];

// 残りの確率で選ばれるデフォルト（B）の重みを計算するための総和
const TOTAL_MAX = 16777216;

// === 3. 抽選システム（どれだけカテゴリが増えてもここは一切書き換え不要） ===
function selectCat() {
  const base = random.nextInt(TOTAL_MAX);
  let currentRange = 0;

  // 設定された重みを順番にチェックしていく自動ループ
  for (const category of CATEGORY_WEIGHTS) {
    currentRange += category.weight;
    if (base < currentRange) {
      // 通常のカテゴリ当選（デバッグ用にレベルを落としてログ出ししてもOK）
      logger.debug({ category: category.name, base }, '猫みくじの抽選が行われました');
      return category.get();
    }
  }

  // 💎 16777216分の1をすり抜けた「ヒミツ（B）」の処理
  // 認識災害レベルの事象なので warn でログを残す
  logger.warn({ base, total: TOTAL_MAX }, '【警告】16777216分の1の「ヒミツ」が当選しました。世界が緋色に染まります。');
  // どのカテゴリの重みにも引っかからなかった場合は最後の「B」を返す
  return Buffer.from(B, 'base64').toString();
}

module.exports.selectCat = selectCat;

