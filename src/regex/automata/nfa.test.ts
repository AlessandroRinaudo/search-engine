import {expect} from 'chai';
import 'mocha';

import {NFA} from "./nfa";
import {EPSILON, EPSILON_CLOSURE} from "../constants";
import {NFAState} from "../state/nfa-state";
import {char, or} from "../builder/machines";

describe('NFA', () => {

    it(`should transit 'a' from s1 to s2`, () => {
        const s1 = new NFAState({accepting: false});
        const s2 = new NFAState({accepting: true});

        s1.addTransitionForSymbol('a', s2);
        const nfa = new NFA(s1, s2);
        expect(nfa.inState.match('a')).to.be.true;
    });
    it(`should transit only empty string through epsilon transition`, () => {
        const s1 = new NFAState({accepting: false});
        const s2 = new NFAState({accepting: true});
        s1.addTransitionForSymbol(EPSILON, s2);
        const nfa = new NFA(s1, s2);
        expect(nfa.inState.match('')).to.be.true;
        expect(nfa.inState.match('a')).to.be.false;
    });
    it(`should transit 'ab' on NFA through epsilon-transition`, () => {
        const i1 = new NFAState({accepting: false});
        const o1 = new NFAState({accepting: false});
        const i2 = new NFAState({accepting: false});
        const o2 = new NFAState({accepting: true});

        i1.addTransitionForSymbol('a', o1);
        o1.addTransitionForSymbol(EPSILON, i2);
        i2.addTransitionForSymbol('b', o2);

        const nfa = new NFA(i1, o2);

        expect(nfa.match('ab')).to.be.true;
    });

    it('should avoid epsilon-transition infinite loop', () => {
        const s1 = new NFAState({accepting: false});
        const s2 = new NFAState({accepting: false});
        const s3 = new NFAState({accepting: true});

        s1.addTransitionForSymbol('a', s2);
        s2.addTransitionForSymbol(EPSILON, s3);
        s3.addTransitionForSymbol(EPSILON, s2);

        const nfa = new NFA(s1, s3);

        expect(nfa.match('a')).to.be.true;
    });

    it('should compute transition table without e-transition', () => {
        const s1 = new NFAState({accepting: false});
        const s2 = new NFAState({accepting: false});
        const s3 = new NFAState({accepting: true});

        s1.addTransitionForSymbol('a', s2);
        s2.addTransitionForSymbol('b', s3);

        const nfa = new NFA(s1, s2);

        const table = nfa.getTransitionTable();

        expect(table.has(1) && table.get(1)!['a'][0] === 2 ).to.be.true;
        expect(table.has(2) && table.get(2)!['b'][0] === 3).to.be.true;
        expect(table.has(3) && table.get(3)![EPSILON_CLOSURE][0] === 3).to.be.true;
    })

    it('should compute transition table with e-transition', () => {
        const s1 = new NFAState({accepting: false});
        const s2 = new NFAState({accepting: true});

        s1.addTransitionForSymbol(EPSILON, s2);
        s1.addTransitionForSymbol('a', s2);

        const nfa = new NFA(s1, s2);

        const table = nfa.getTransitionTable();

        // State 1 transits to 2 with 'a'
        expect(table.get(1)!['a'][0] === 2).to.be.true;
        // e* of 1 should be {1,2}
        expect(table.get(1)![EPSILON_CLOSURE]).to.eql([1,2])
        // e* of 2 should be {2}
        expect(table.get(2)![EPSILON_CLOSURE]).to.eql([2])
    });

    it('should compute correct alphabet', () => {
        const re = or(char('a'), char('b'), char('c'));

        const alphabet = re.getAlphabet();

        expect(alphabet.has('a')).to.be.true;
        expect(alphabet.has('b')).to.be.true;
        expect(alphabet.has('c')).to.be.true;
    });
});
