import {expect} from 'chai';
import 'mocha';

import {char, or} from '../builder/machines';
import {NFA} from "./nfa";
import {DFA} from "./dfa";

describe('DFA class test', () => {
    const re: NFA = or(char('a'), char('b'));
    const dfa: DFA = new DFA(re);
    it('/a|b/ should match with a', () => {
        expect(re.match('a')).to.be.true;
        expect(dfa.match('a')[0]).to.eql([0, 1])
    });
    it('/a|b/ should match with b', () => {
        expect(re.match('b')).to.be.true;
        expect(dfa.match('b')[0]).to.be.eql([0, 1]);
    });
    it('/a|b/ should not match with c', () => {
        expect(re.match('c')).to.be.false;
        expect(dfa.match('c').length).to.equal(0);
    });
});
