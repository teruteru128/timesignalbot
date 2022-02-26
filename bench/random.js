
/**
 * TODO: mochaでベンチマークをとるにはどうしたらいいか？
 */

const Benchmark = require('benchmark');
const crypto = require('crypto');

const suite = new Benchmark.Suite();


// https://github.com/openjdk/jdk/blob/739769c8fc4b496f08a92225a12d07414537b6c0/src/java.base/share/classes/java/util/Random.java#L425
function nextFloatReduce() {
  return crypto.webcrypto.getRandomValues(new Uint8Array(3)).reduce((previos, current, i, a) => (previos << 8) | current, 0) / (1 << 24);
}


// https://github.com/openjdk/jdk/blob/739769c8fc4b496f08a92225a12d07414537b6c0/src/java.base/share/classes/java/util/Random.java#L425
function nextFloatNoReduce() {
  return (crypto.webcrypto.getRandomValues(new Int32Array(1))[0] >>> 8) / (1 << 24);
}

suite.add('nextFloatReduce', nextFloatReduce)
  .add('nextFloatNoReduce', nextFloatNoReduce)
  .on('cycle', (event) => console.log(String(event.target)))
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run({ async: true });
