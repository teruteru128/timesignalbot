
const crypto = require('crypto');

// https://github.com/openjdk/jdk/blob/739769c8fc4b496f08a92225a12d07414537b6c0/src/java.base/share/classes/java/util/Random.java#L324
function nextInt(bound) {
  if (arguments.length < 1) {
    // crypto.getRandomValues() は node v17.4.0 から使用可能
    // crypto.webcrypto.getRandomValues() は node v15.0.0 から使用可能
    return crypto.webcrypto.getRandomValues(new Int32Array(1))[0];
  } else {
    if (bound <= 0) {
      throw 'bound must be positive';
    }

    // FIXME: 呼び出されるたびにarrayが生成されるのはもったいなくない？=>乱数がArray経由でしか取得できないからなんとも……
    var array = new Int32Array(1);
    crypto.webcrypto.getRandomValues(array);
    var r = array[0] >>> 1;
    var m = bound - 1;
    if ((bound & m) == 0)
      r = Number(BigInt.asIntN(32, (BigInt(bound) * BigInt(r)) >> 31n));
    else {
      for (var u = r; u - (r = u % bound) + m < 0; u = (crypto.webcrypto.getRandomValues(array)[0] >>> 1));
    }
    return r;
  }
}

// https://github.com/openjdk/jdk/blob/739769c8fc4b496f08a92225a12d07414537b6c0/src/java.base/share/classes/java/util/Random.java#L425
function nextFloat() {
  /// FIXME: これ呼び出されるたびにreduceが回るのは絶対重いと思うけどなぁ……
  // return crypto.webcrypto.getRandomValues(new Uint8Array(3)).reduce((previos, current, i, a) => (previos << 8) | current, 0) / (1 << 24);
  // reduceで回さないほうが早い
  return (crypto.webcrypto.getRandomValues(new Int32Array(1))[0] >>> 8) / (1 << 24);
}

module.exports.nextInt = nextInt;
module.exports.nextFloat = nextFloat;