// setTimeout に渡せる待ち時間の上限 (約24.8日)。これを超えると即座に実行されてしまう
const MAX_TIMEOUT = 2 ** 31 - 1;

/**
 * キーごとに「指定日時に1回だけ実行する」タイマーを管理する。
 * 上限を超える待ち時間は、上限ごとに区切って待ち直す。
 */
class KeyedTimers {
  constructor({ maxTimeout = MAX_TIMEOUT } = {}) {
    this.maxTimeout = maxTimeout;
    this.handles = new Map();
  }

  /**
   * @param {string} key
   * @param {Date} date 過去の日時なら直ちに実行する
   * @param {() => void} fn
   */
  set(key, date, fn) {
    this.clear(key);
    const tick = () => {
      const delay = date.getTime() - Date.now();
      if (delay > this.maxTimeout) {
        this.handles.set(key, setTimeout(tick, this.maxTimeout));
      } else {
        this.handles.set(key, setTimeout(() => {
          this.handles.delete(key);
          fn();
        }, Math.max(delay, 0)));
      }
    };
    tick();
  }

  clear(key) {
    clearTimeout(this.handles.get(key));
    this.handles.delete(key);
  }

  has(key) {
    return this.handles.has(key);
  }
}

module.exports.KeyedTimers = KeyedTimers;
