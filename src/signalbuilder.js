
const random = require('./random');

function buildSignal(now) {
  let prefix = '真夜中';
  let secondPrefix = 'だよ';
  let date = now.getDate();
  let month = now.getMonth();
  let day = now.getDay();
  // choose prefix
  if (date == 1) {
    if (month == 0) {
      // 毎年1月1日
      prefix = '新年あけましておめでとう';
      secondPrefix = '';
    } else {
      // 2~12月1日
      prefix = (month + 1) + '月';
    }
  } else if (date == 20 && month == 10) {
    prefix = '20, november';
  } else if (day == 1) {
    prefix = '月曜日';
  }
  // build signal message
  // オは40以上100(未満ではなく)以下
  return prefix + secondPrefix + 'ハルト' + 'オ'.repeat(40 + random.nextInt(61));
}

module.exports.buildSignal = buildSignal;
