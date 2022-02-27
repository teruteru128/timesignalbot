
const assert = require('assert');
const { buildSignal } = require('../src/signalbuilder');

describe('buildSignal', () => {

  it('January 1st of every month', () => {
    // 2022年1月1日0時0分0秒
    let date = new Date(2022, 0, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^新年あけましておめでとうハルトオ{40,100}$/);
  });

  it('1st of every month from February to December', () => {
    // 2022年2月1日0時0分0秒
    let date = new Date(2022, 1, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^2月だよハルトオ{40,100}$/);
    // 2022年3月1日0時0分0秒
    date = new Date(2022, 2, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^3月だよハルトオ{40,100}$/);
    // 2022年4月1日0時0分0秒
    date = new Date(2022, 3, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^4月だよハルトオ{40,100}$/);
    // 2022年5月1日0時0分0秒
    date = new Date(2022, 4, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^5月だよハルトオ{40,100}$/);
    // 2022年6月1日0時0分0秒
    date = new Date(2022, 5, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^6月だよハルトオ{40,100}$/);
    // 2022年7月1日0時0分0秒
    date = new Date(2022, 6, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^7月だよハルトオ{40,100}$/);
    // 2022年8月1日0時0分0秒
    date = new Date(2022, 7, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^8月だよハルトオ{40,100}$/);
    // 2022年9月1日0時0分0秒
    date = new Date(2022, 8, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^9月だよハルトオ{40,100}$/);
    // 2022年10月1日0時0分0秒
    date = new Date(2022, 9, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^10月だよハルトオ{40,100}$/);
    // 2022年11月1日0時0分0秒
    date = new Date(2022, 10, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^11月だよハルトオ{40,100}$/);
    // 2022年12月1日0時0分0秒
    date = new Date(2022, 11, 1, 0, 0, 0);
    assert.match(buildSignal(date), /^12月だよハルトオ{40,100}$/);
  });

  it('20, november', () => {
    // 2022年1月1日0時0分0秒
    let date = new Date(2022, 10, 20, 0, 0, 0);
    assert.match(buildSignal(date), /^20, novemberだよハルトオ{40,100}$/);
  });

  it('monday', () => {
    // 2022年1月3日0時0分0秒
    let date = new Date(2022, 0, 3, 0, 0, 0);
    assert.match(buildSignal(date), /^月曜日だよハルトオ{40,100}$/);
  });

  it('default signal', () => {
    // 2022年1月1日0時0分0秒
    let date = new Date(2022, 0, 2, 0, 0, 0);
    assert.match(buildSignal(date), /^真夜中だよハルトオ{40,100}$/);
  });

});
