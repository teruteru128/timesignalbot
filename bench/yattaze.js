
const { Suite } = require('benchmark');
const random = require('../src/random');

const suite = new Suite();
const msg = 'やりましたぜ。';
const YATTAZE_PATTERN = /^や(っ|りまし)た(ぜ|わ)。$/;

function bench1() { return equalsMatch(msg); }
function bench2() { return regexMatch(msg); }

function equalsMatch(msg) { return msg === 'やったぜ。' || msg === 'やりましたわ。' || msg === 'やったわ。'; }
function regexMatch(msg) { return YATTAZE_PATTERN.test(msg); }

suite.add('=== matches', bench1).add('regex matches', bench2)
  .on('cycle', (event) => console.log('%s', String(event.target)))
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`);
  })
  .run({ async: true });
