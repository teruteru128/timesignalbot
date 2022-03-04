
/**
 * TODO: mochaでベンチマークをとるにはどうしたらいいか？
 */
const assert = require('assert');
const random = require('../src/random');
const instance = new random.Random();

describe('instance nextFloat', () => {

    it('range test', () => {
        let a = instance.nextFloat();
        assert(0 <= a && a < 1, `a is ${a}`);
    });

});

describe('instance nextInt', () => {

    it('no arguments', () => {
        let a = instance.nextInt();
        assert(-2147483648 <= a && a <= 2147483647, `a is ${a}`);
    });

    it('bounds is zero', () => {
        assert.throws(() => instance.nextInt(0));
    });

    it('negative bounds', () => {
        assert.throws(() => instance.nextInt(-1));
    });

    it('too many arguments', () => {
        // TODO: 引数が多すぎるときはどうすべきか？
        let a = instance.nextInt(12, 13);
        assert(0 <= a && a < 12);
    });

    it('bound is not a power of 2', () => {
        let a = instance.nextInt(1023);
        assert(0 <= a && a < 1023, `a is ${a}`);
    });

    it('bound is a power of 2', () => {
        let a = instance.nextInt(1024);
        assert(0 <= a && a < 1024, `a is ${a}`);
    });

});

describe('nextFloat', () => {

    it('range test', () => {
        let a = random.nextFloat();
        assert(0 <= a && a < 1, `a is ${a}`);
    });

});

describe('nextInt', () => {

    it('no arguments', () => {
        let a = random.nextInt();
        assert(-2147483648 <= a && a <= 2147483647, `a is ${a}`);
    });

    it('bounds is zero', () => {
        assert.throws(() => random.nextInt(0));
    });

    it('bounds is invalid empty array', () => {
        assert.throws(() => random.nextInt([]));
    });

    it('bounds is invalid array 1', () => {
        assert.throws(() => random.nextInt(+[]));
    });

    it('bounds is invalid array 2', () => {
        assert.throws(() => random.nextInt([0]));
    });

    it('bounds is invalid array 3', () => {
        // FIXME: 何故かエラーにならずに正常扱いになる。誰か例外を吐くようにしてくれ
        assert.equal(random.nextInt([1]), 0);
    });

    it('bounds is invalid empty string', () => {
        assert.throws(() => random.nextInt(''));
    });

    it('bounds is invalid \'0\'', () => {
        assert.throws(() => random.nextInt('0'));
    });

    it('bounds is invalid tab char string', () => {
        assert.throws(() => random.nextInt('\t'));
    });

    it('bounds is invalid null', () => {
        assert.throws(() => random.nextInt(null));
    });

    it('bounds is invalid undefined', () => {
        // bound === undefined で判定すると引数に undefined が渡されたときに区別ができない
        assert.throws(() => random.nextInt(undefined));
    });

    it('negative bounds', () => {
        assert.throws(() => random.nextInt(-1));
    });

    it('too many arguments', () => {
        // TODO: 引数が多すぎるときはどうすべきか？
        let a = random.nextInt(12, 13);
        assert(0 <= a && a < 12);
    });

    it('bound is not a power of 2', () => {
        let a = random.nextInt(1023);
        assert(0 <= a && a < 1023, `a is ${a}`);
    });

    it('bound is a power of 2', () => {
        let a = random.nextInt(1024);
        assert(0 <= a && a < 1024, `a is ${a}`);
    });

});
