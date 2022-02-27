
const random = require('./random');

function buildSignal(now) {
    let prefix = '真夜中';
    let date = now.getDate();
    let month = now.getMonth();
    let day = now.getDay();
    // choose prefix
    if (date == 1) {
      prefix = (date + 1) + '月';
    } else if (date == 20 && month == 10) {
      prefix = '20, november';
    } else if (day == 1) {
      prefix = '月曜日';
    }
    // build signal message
    return prefix + 'だよハルト' + 'オ'.repeat(40 + random.nextInt(60));
}

module.exports.buildSignal = buildSignal;
