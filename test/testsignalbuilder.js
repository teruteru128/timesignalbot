
const assert = require('assert');
const { describe, it } = require('mocha');

const { buildSignal } = require('../src/modules/signalbuilder');

describe('test 1', ()=>{
    it('test 1-1', ()=>{
        const date = new Date(2026, 0, 1, 0, 0, 0);
        const body = buildSignal(date);
        assert(1);
    });
});

