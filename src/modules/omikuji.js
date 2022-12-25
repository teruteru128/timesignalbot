const random = require('./random');

const FORTUNES = ['**大凶**です………', '**凶**です…', '**末吉**です!', '**小吉**です!', '**中吉**です!!', '**吉**です!!!', '**大吉**です!!!!!!'];

function omikuji() {
  return FORTUNES[random.nextInt(FORTUNES.length)];
}

module.exports.omikuji = omikuji;
