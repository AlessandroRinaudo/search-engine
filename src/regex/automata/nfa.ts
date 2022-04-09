import {NFAState} from "../state/nfa-state";
import {ITransition, SN, State} from "../state/state";
import {EPSILON, EPSILON_CLOSURE} from "../constants";

/**
 * NFA fragment.
 *
 * NFA sub-fragments can be combined to a larger NFAs building
 * the resulting machine. Combining the fragments is done by patching
 * edges of the in- and out-states.
 *
 * 2-states implementation, `inState`, and `outSate`. Eventually all transitions
 * go to the same `outState`, which can further be connected via ε-transition
 * with other fragment.
 */

export type NFA_TABLE = Map<SN, ITransition>;

export class NFA {
    inState: NFAState;
    outState: NFAState;
    transitionTable!: NFA_TABLE;
    acceptingStates!: Set<State>;
    alphabet!: Set<string>;
    acceptingStateNumbers!: Set<SN>;

    constructor(inState: NFAState, outState: NFAState) {
        this.inState = inState;
        this.outState = outState;
        // Pre compute transition table on instantiation
    }

    /**
     * Tries to recognize a string based on this NFA fragment.
     */
    match(string: string): boolean {
        return this.inState.match(string);
    }

    /**
     * Returns the transition table
     *
     * Example for: a*
     * Map(2) {
     *      1 => { a: [ 2 ], 'ε*': [ 1, 2 ] },
     *      2 => { 'ε*': [ 2, 1 ] }
     *  }
     */
    getTransitionTable(): NFA_TABLE {
        if (this.transitionTable) {
            return this.transitionTable;
        }

        this.transitionTable = new Map();
        const visitedStates = new Set<State>();
        this.acceptingStates = new Set<State>();

        /**
         * Visit each state, label, and add to visited state
         */
        const visitState = (state: State) => {
            if (visitedStates.has(state)) {
                return;
            }
            visitedStates.add(state);
            state.label = visitedStates.size;
            this.transitionTable.set(state.label, {});

            if (state.accepting) {
                this.acceptingStates.add(state);
            }

            state.getTransitions().forEach((transitions, symbol) => {
                let mergedState = [];
                for (const next of transitions) {
                    visitState(next);
                    mergedState.push(next.label);
                }
                this.transitionTable.get(state.label)![symbol] = mergedState;
            })
        }

        visitState(this.inState);

        const computeEpsilonTransition = () => {
            visitedStates.forEach((state) => {
                this.transitionTable.get(state.label)![EPSILON_CLOSURE] =
                    [...state.getEpsilonClosure()]
                        .map(m => m.label);
                delete this.transitionTable.get(state.label)![EPSILON];
            })
        };

        computeEpsilonTransition();

        return this.transitionTable;
    }

    /**
     * Returns an alphabet for this NFA
     */
    getAlphabet(): Set<string> {
        if (this.alphabet) {
            return this.alphabet;
        }
        this.alphabet = new Set<string>();
        const table = this.getTransitionTable();
        for (const [_, transitions] of table) {
            for (const symbol of Object.keys(transitions)) {
                if (symbol !== EPSILON_CLOSURE) {
                    this.alphabet.add(symbol);
                }
            }
        }
        return this.alphabet;
    }

    /**
     * Get NFA's accepting states
     */
    getAcceptingStates(): Set<State> {
        if (!this.acceptingStates) {
            // Accepting states are computed with transition table
            this.getTransitionTable();
        }

        return this.acceptingStates;
    }

    /**
     * Return accepting state numbers
     */
    getAcceptingStateNumbers(): Set<SN> {
        if (!this.acceptingStateNumbers) {
            this.acceptingStateNumbers = new Set<SN>(
                [...this.acceptingStates]
                    .map(s => s.label)
            );
        }
        return this.acceptingStateNumbers;
    }

    /**
     * Returns reachable states from a given state on a given symbol
     * @param symbol
     * @param startingState
     */
    getTransitionsOnSymbol(startingState: SN, symbol: string): Array<SN> | undefined {
        return this.transitionTable.get(startingState)![symbol];
    }


}
