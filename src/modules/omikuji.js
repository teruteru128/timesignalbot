const random = require('./random');

const FORTUNES = ['大凶です………', '凶です…', '末吉です!', '小吉です!', '中吉です!!', '吉です!!!', '大吉です!!!!!!'];

function omikuji() {
  return FORTUNES[random.nextInt(FORTUNES.length)];
}

module.exports.omikuji = omikuji;
