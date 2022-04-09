import {expect} from 'chai';
import 'mocha';

import {State} from './state';
import {EPSILON} from "../constants";

describe('State', () => {

    const s1 = new State({accepting: false});
    const s2 = new State({accepting: true});


    it('should add correct transition', () => {
        // Add transition on character 'a' from state
        // s1 to state s2:
        s1.addTransitionForSymbol('a', s2);

        const transitions = s1.getTransitionsForSymbol('a');

        // There should be only one transition, to the state s2.
        expect(transitions.size).to.equal(1);
        expect(transitions.has(s2));
    });

    it('should return e-closure', () => {
        const s1 = new State();
        const s2 = new State({accepting: true});

        s1.addTransitionForSymbol(EPSILON, s2);
        s2.addTransitionForSymbol(EPSILON, s1);
        s1.addTransitionForSymbol('a', s2);

        const closure_s1 = s1.getEpsilonClosure();
        const closure_s2 = s2.getEpsilonClosure();

        expect(closure_s1.size).to.equal(2); // self + s2
        expect(closure_s2.size).to.equal(2); // self + s1
    })

});
