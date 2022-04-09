/**
 * Single char machine
 */

import {EPSILON} from "../constants";
import {NFA} from "../automata/nfa";
import {NFAState} from "../state/nfa-state";

export function char(symbol: string): NFA {

    const inState: NFAState = new NFAState({});
    const outState: NFAState = new NFAState({});

    outState.accepting = true;

    inState.addTransitionForSymbol(symbol, outState);

    return new NFA(inState, outState);
}

/**
 * Epsilon machine
 * @returns
 */

export function epsilon() {
    return char(EPSILON);
}

/**
 * Pair Only Concatenation
 */

export function concatPair(first: NFA, second: NFA): NFA {
    first.outState.accepting = false;
    second.outState.accepting = true;

    first.outState.addTransitionForSymbol(
        EPSILON,
        second.inState
    );

    return new NFA(first.inState, second.outState);
}

/**
 * Concatenation factory
 *
 */

export function concat(first: NFA, ...rest: Array<NFA>): NFA {
    for (let fragment of rest) {
        first = concatPair(first, fragment);
    }
    return first;
}

/**
 * Union factory : single pair "a|b"
 * @param first
 * @param second
 */
export function orPair(first: NFA, second: NFA): NFA {

    // New starting and accepting states
    const inState = new NFAState();
    const outState = new NFAState();

    // Maintain invariant
    first.outState.accepting = false;
    second.outState.accepting = false;
    outState.accepting = true;

    // Setting transitions
    inState.addTransitionForSymbol(
        EPSILON,
        first.inState
    );

    inState.addTransitionForSymbol(
        EPSILON,
        second.inState
    );

    first.outState.addTransitionForSymbol(
        EPSILON,
        outState
    );

    second.outState.addTransitionForSymbol(
        EPSILON,
        outState
    );

    return new NFA(inState, outState);
}

/**
 * Union factory: multiple char
 */

export function or(first: NFA, ...rest: Array<NFA>): NFA {
    for (let fragment of rest) {
        first = orPair(first, fragment);
    }

    return first;
}


/**
 * Repetition factory aka Kleene closure : A*
 */

export function rep(fragment: NFA): NFA {
    fragment.outState.accepting = true;
    fragment.inState.accepting = false;

    fragment.inState.addTransitionForSymbol(
        EPSILON,
        fragment.outState
    );

    fragment.outState.addTransitionForSymbol(
        EPSILON,
        fragment.inState
    );

    return fragment;
}

/**
 * Plus factory
 */
export function plusRep(fragment: NFA) {
    fragment.outState.addTransitionForSymbol(
        EPSILON,
        fragment.inState
    );

    return fragment;
}
