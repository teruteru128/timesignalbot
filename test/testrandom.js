
/**
 * TODO: mochaでベンチマークをとるにはどうしたらいいか？
 */
const assert = require('assert');
const random = require('../src/random');

it('nextFloat', () => {
    var a = random.nextFloat();
    assert(0 <= a && a < 1, `a is ${a}`);
});

it('nextInt 1', () => {
    var a = random.nextInt();
    assert(-2147483648 <= a && a <= 2147483647);
});

it('nextInt 2', () => {
    var a = random.nextInt(1023);
    assert(0 <= a && a < 1024);
});

it('nextInt 3', () => {
    var a = random.nextInt(1024);
    assert(0 <= a && a < 1024);
});
