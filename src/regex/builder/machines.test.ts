import {expect} from 'chai';
import 'mocha';

import {char, concat, epsilon, or, rep} from './machines';

describe('Single character', () => {
    const a = char('a');
    it(`'a' should match '/a/'`, () => {
        expect(a.match('a')).to.be.true
    });

    it(`'b' should not match '/a/'`, () => {
        expect(a.match('b')).to.be.false;
    });

    it(`'' should not match '/a/'`, () => {
        expect(a.match('')).to.be.false;
    });


    it(`'sdb' should not match '/a/'`, () => {
        expect(a.match('sdb')).to.be.false;
    })
});

describe('Epsilon char', () => {
    const e = epsilon();

    it('should have correct states', () => {
        expect(e.inState.accepting).to.be.false;
        expect(e.outState.accepting).to.be.true;
    })
});

describe('Concat factory char', () => {
    const c = concat(char('a'), char('b'), char('c'));

    it(`'abc' should match with '/abc/' `, () => {
        expect(c.match('abc')).to.be.true
    });

    it(`'abb' should not match with '/abc/' `, () => {
        expect(c.match('abb')).to.be.false
    });
});

describe('Union factory char', () => {
    const c = or(char('a'), char('b'), char('c'));

    it(`'a' should match with '/a|b|c/' `, () => {
        expect(c.match('a')).to.be.true
    });

    it(`'b' should match with '/a|b|c/' `, () => {
        expect(c.match('b')).to.be.true
    });

    it(`'c' should match with '/a|b|c/' `, () => {
        expect(c.match('c')).to.be.true
    });

    it(`'e' should not match with '/a|b|c/' `, () => {
        expect(c.match('e')).to.be.false
    });

    it(`'ab' should not match with '/a|b|c/' `, () => {
        expect(c.match('ab')).to.be.false
    });
});

describe('Repetition factory', () => {
    const re = rep(char('a'));

    it(`'' should match with '/a*/' `, () => {
        expect(re.match('')).to.be.true
    });

    it(`'a' should match with '/a*/' `, () => {
        expect(re.match('a')).to.be.true
    });

    it(`'aa' should match with '/a*/' `, () => {
        expect(re.match('aa')).to.be.true
    });

    it(`'b' should not match with '/a*/' `, () => {
        expect(re.match('b')).to.be.false
    });
});
