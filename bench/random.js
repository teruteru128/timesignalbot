
/**
 * TODO: mochaでベンチマークをとるにはどうしたらいいか？
 */

const Benchmark = require('benchmark');
const { webcrypto } = require('crypto');
const random = require('../src/random');

const suite = new Benchmark.Suite();
const instance = new random.Random();


// https://github.com/openjdk/jdk/blob/739769c8fc4b496f08a92225a12d07414537b6c0/src/java.base/share/classes/java/util/Random.java#L425
function nextFloatReduce() {
  return webcrypto.getRandomValues(new Uint8Array(3)).reduce((previos, current, i, a) => (previos << 8) | current, 0) / (1 << 24);
}


// https://github.com/openjdk/jdk/blob/739769c8fc4b496f08a92225a12d07414537b6c0/src/java.base/share/classes/java/util/Random.java#L425
function nextFloatNoReduce() {
  return (webcrypto.getRandomValues(new Int32Array(1))[0] >>> 8) / (1 << 24);
}

function instanceNextInt0() {
  return instance.nextInt();
}

function instanceNextInt1() {
  return instance.nextInt(1023);
}

function instanceNextInt2() {
  return instance.nextInt(1073741825);
}

function instanceNextFloat() {
  return instance.nextFloat();
}

function nonInstanceNextFloat() {
  return random.nextFloat();
}

/*
2022年  3月  3日 木曜日 23:57:12 JST
うーん……やっぱり毎回Int32Arrayを生成するのは重いねんな……
nextFloatReduce x 373,330 ops/sec ±0.73% (90 runs sampled)
nextFloatNoReduce x 423,357 ops/sec ±1.39% (93 runs sampled)
class random nextInt with no arguments x 476,334 ops/sec ±3.73% (82 runs sampled)
class random nextInt with small bounds x 482,902 ops/sec ±5.10% (83 runs sampled)
class random nextInt with worst bounds x 498,975 ops/sec ±5.06% (88 runs sampled)
class random nextFloat x 537,137 ops/sec ±0.52% (90 runs sampled)
module random nextFloat x 424,714 ops/sec ±0.87% (93 runs sampled)
Fastest is class random nextFloat,class random nextInt with worst bounds,class random nextInt with small bounds
*/
suite.add('nextFloatReduce', nextFloatReduce)
  .add('nextFloatNoReduce', nextFloatNoReduce)
  .add('class random nextInt with no arguments', instanceNextInt0)
  .add('class random nextInt with small bounds', instanceNextInt1)
  .add('class random nextInt with worst bounds', instanceNextInt2)
  .add('class random nextFloat', instanceNextFloat)
  .add('module random nextFloat', nonInstanceNextFloat)
  .on('cycle', (event) => console.log('%s', String(event.target)))
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run({ async: true });
