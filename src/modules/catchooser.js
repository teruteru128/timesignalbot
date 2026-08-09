const fs = require('fs');
const path = require('path');
const { pino } = require('pino');
const random = require('./random');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const TOTAL_MAX = 16777216;

// === 1. データの同期読み込み ===
let catData = null;
let CAT_KAOMOJI = [];

try {
  // JSONデータの読み込み
  const jsonPath = path.join(__dirname, 'cats_data.json');
  catData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  
  // 顔文字テキストの読み込み
  const txtPath = path.join(__dirname, 'catfaces.txt');
  const txtData = fs.readFileSync(txtPath, 'utf-8');
  CAT_KAOMOJI = txtData.replace('\\', '\\\\').replace(/`/g, '\\`').replace(/\*/g, '\\~').replace(/_/g, '\\_').replace(/\|/g, '\\|').split(/\n/);
  
  logger.info('猫みくじのデータファイルを正常にロードしました。');
} catch (err) {
  logger.error(err, 'データファイルの読み込みに失敗しました。');
}

// === 2. 抽選ロジック ===
function selectCat() {
  if (!catData) return 'ねこ（データ未ロード）';

  const base = random.nextInt(TOTAL_MAX);
  let currentRange = 0;

  // JSONに定義されたカテゴリをループ処理
  for (const cat of catData.categories) {
    currentRange += cat.weight;
    if (base < currentRange) {
      logger.debug({ category: cat.name, base }, '猫みくじ抽選');
      
      // 特殊枠（SCP-444-JP）のデコード処理
      if (cat.base64) {
        return Buffer.from(cat.base64, 'base64').toString();
      }
      
      // 通常枠のランダムチョイス
      const chosen = cat.items[random.nextInt(cat.items.length)];
      return cat.prefix ? `${cat.prefix}${chosen}` : chosen;
    }
  }

  // 顔文字枠（ファイルから読み込んだので別処理）
  // ※スプレッドシートの順序に合わせて、必要ならforループの適切な位置へ移植してください
  currentRange += 2673869; // 顔文字のweight
  if (base < currentRange) {
    return CAT_KAOMOJI[random.nextInt(CAT_KAOMOJI.length)] || '🐱';
  }

  // 💎 16777216分の1をすり抜けた最後の「ヒミツ」
  logger.warn({ base, total: TOTAL_MAX }, '【警告】16777216分の1の「ヒミツ」が当選しました。');
  return Buffer.from(catData.secret_b, 'base64').toString();
}

module.exports.selectCat = selectCat;

