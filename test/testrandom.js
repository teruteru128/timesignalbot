
/**
 * TODO: mochaでベンチマークをとるにはどうしたらいいか？
 */
const assert = require('assert');
const random = require('../src/random');

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

    it('negative bounds', () => {
        assert.throws(() => random.nextInt(-1));
    });

    it('too many arguments', () => {
        // TODO: 引数が多すぎるときはどうすべきか？
        //assert.throws(() => random.nextInt(12, 13));
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
