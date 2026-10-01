const assert = require('assert');
const { describe, it } = require('mocha');

const { parseJstDateTime } = require('../src/features/oneshot/parseDateTime');
const { KeyedTimers } = require('../src/features/oneshot/KeyedTimers');

describe('parseJstDateTime', () => {
  it('日本時間として解釈する', () => {
    assert.strictEqual(parseJstDateTime('2026-12-31 23:59:59').toISOString(), '2026-12-31T14:59:59.000Z');
  });
  it('秒の省略、スラッシュ区切り、T 区切りを受け付ける', () => {
    assert.strictEqual(parseJstDateTime('2027/1/1 0:00').toISOString(), '2026-12-31T15:00:00.000Z');
    assert.strictEqual(parseJstDateTime(' 2027-01-01T09:30:00 ').toISOString(), '2027-01-01T00:30:00.000Z');
  });
  it('存在しない日時は null', () => {
    assert.strictEqual(parseJstDateTime('2026-02-29 00:00'), null);
    assert.strictEqual(parseJstDateTime('2026-12-31 24:00'), null);
    assert.strictEqual(parseJstDateTime('2026-13-01 00:00'), null);
  });
  it('形式が違うものは null', () => {
    assert.strictEqual(parseJstDateTime('明日の正午'), null);
    assert.strictEqual(parseJstDateTime('2026-12-31'), null);
  });
});

describe('KeyedTimers', () => {
  it('指定日時に実行する', (done) => {
    const timers = new KeyedTimers();
    timers.set('a', new Date(Date.now() + 20), () => {
      assert.strictEqual(timers.has('a'), false);
      done();
    });
  });
  it('上限を超える待ち時間は区切って待ち直す', (done) => {
    const timers = new KeyedTimers({ maxTimeout: 10 });
    const start = Date.now();
    timers.set('a', new Date(start + 50), () => {
      assert.ok(Date.now() - start >= 49);
      done();
    });
  });
  it('clear すると実行しない', (done) => {
    const timers = new KeyedTimers({ maxTimeout: 10 });
    timers.set('a', new Date(Date.now() + 30), () => done(new Error('fired')));
    setTimeout(() => timers.clear('a'), 15);
    setTimeout(done, 60);
  });
});
