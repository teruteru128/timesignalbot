
const assert = require('assert');
const { buildSignal } = require('../src/signalbuilder');

describe('buildSignal', () => {

  it('January 1st of every month', () => {
    // 2022年01月01日00時00分00秒
    let date = new Date(2022, 0, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^新年あけましておめでとうハルトオ{40,100}$/);
    // 2024年01月01日は月曜日
    date = new Date(2024, 0, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^新年あけましておめでとうハルトオ{40,100}$/);
  });

  it('1st of every month from February to December', () => {
    // 2022年02月01日00時00分00秒
    let date = new Date(2022, 1, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^2月だよハルトオ{40,100}$/);
    // 2022年03月01日00時00分00秒
    date = new Date(2022, 2, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^3月だよハルトオ{40,100}$/);
    // 2022年04月01日00時00分00秒
    date = new Date(2022, 3, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^4月だよハルトオ{40,100}$/);
    // 2022年05月01日00時00分00秒
    date = new Date(2022, 4, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^5月だよハルトオ{40,100}$/);
    // 2022年06月01日00時00分00秒
    date = new Date(2022, 5, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^6月だよハルトオ{40,100}$/);
    // 2022年07月01日00時00分00秒
    date = new Date(2022, 6, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^7月だよハルトオ{40,100}$/);
    // 2022年08月01日00時00分00秒
    date = new Date(2022, 7, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^8月だよハルトオ{40,100}$/);
    // 2022年09月01日00時00分00秒
    date = new Date(2022, 8, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^9月だよハルトオ{40,100}$/);
    // 2022年10月01日00時00分00秒
    date = new Date(2022, 9, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^10月だよハルトオ{40,100}$/);
    // 2022年11月01日00時00分00秒
    date = new Date(2022, 10, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^11月だよハルトオ{40,100}$/);
    // 2022年12月01日00時00分00秒
    date = new Date(2022, 11, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^12月だよハルトオ{40,100}$/);
  });

  it('20, november', () => {
    // 2022年01月01日00時00分00秒
    let date = new Date(2022, 10, 20, 0, 0, 0);
    assert.match(buildSignal(date), /^20, novemberだよハルトオ{40,100}$/);
  });

  it('monday', () => {
    // 2022年01月03日00時00分00秒
    let date = new Date(2022, 0, 3, 0, 0, 0);
    assert.match(buildSignal(date), /^月曜日だよハルトオ{40,100}$/);
  });

  it('1st of every month from February to December, but it\'s monday', () => {
    // TODO: n月1日が月曜日のとき、「n月だよ」と「月曜日だよ」のどちらを叫ぶべきか？
    // 2027年02月01日は月曜日
    date = new Date(2027, 1, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^2月だよハルトオ{40,100}$/);
    // 2027年03月01日は月曜日
    date = new Date(2027, 2, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^3月だよハルトオ{40,100}$/);
    // 2024年04月01日は月曜日
    date = new Date(2024, 3, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^4月だよハルトオ{40,100}$/);
    // 2023年05月01日は月曜日
    date = new Date(2023, 4, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^5月だよハルトオ{40,100}$/);
    // 2026年06月01日は月曜日
    date = new Date(2026, 5, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^6月だよハルトオ{40,100}$/);
    // 2024年07月01日は月曜日
    date = new Date(2024, 6, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^7月だよハルトオ{40,100}$/);
    // 2022年08月01日は月曜日
    date = new Date(2022, 7, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^8月だよハルトオ{40,100}$/);
    // 2025年09月01日は月曜日
    date = new Date(2025, 8, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^9月だよハルトオ{40,100}$/);
    // 2029年10月01日は月曜日
    date = new Date(2029, 9, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^10月だよハルトオ{40,100}$/);
    // 2027年11月01日は月曜日
    date = new Date(2027, 10, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^11月だよハルトオ{40,100}$/);
    // 2025年12月01日は月曜日
    date = new Date(2025, 11, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^12月だよハルトオ{40,100}$/);
  });

  it('20, november, but it\'s monday', () => {
    // TODO: 11月20日が月曜日のとき、「20, novemberだよ」と「月曜日だよ」のどちらを叫ぶべきか？
    // 2023年11月20日は月曜日
    let date = new Date(2023, 10, 20, 0, 0, 0);
    assert.match(buildSignal(date), /^20, novemberだよハルトオ{40,100}$/);
  });

  it('default signal', () => {
    // 2022年01月01日00時00分00秒
    let date = new Date(2022, 0, 2, 0, 0, 0);
    assert.match(buildSignal(date), /^真夜中だよハルトオ{40,100}$/);
  });

});
