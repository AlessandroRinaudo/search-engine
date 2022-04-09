import {NFA} from "./nfa";
import {EPSILON_CLOSURE} from "../constants";
import {SN} from "../state/state";
import {Log} from "../utils/logger";

/**
 * DFA is built by subset construction from NFA
 */

export type DFA_TABLE = Map<SN, Map<SN, SN>>;

export class DFA {
    nfa: NFA;
    transitionMap!: DFA_TABLE;
    acceptingStateNumbers!: Set<string>;
    startingState!: string;
    logger = Log.getInstance();

    constructor(nfa: NFA) {
        this.nfa = nfa;
        this.getTransitionTable(); // Pre compute transition table on instantiation
    }


    /**
     * DFA transition table is built from NFA table
     *
     * Example for : a*
     * Map(2) {
            '1,2' => Map(1) { 'a' => '2,1' },
            '2,1' => Map(1) { 'a' => '2,1' }
       }
     */
    getTransitionTable(): DFA_TABLE {
        if (this.transitionMap) {
            return this.transitionMap;
        }
        this.acceptingStateNumbers = new Set();

        const nfaTable = this.nfa.getTransitionTable();

        this.logger.debug("\n*** BEGIN NFA ***");
        this.logger.debug("NFA Transition table")
        this.logger.debug(nfaTable);
        this.logger.debug("*** END NFA *** \n");

        const nfaStates = Array.from(nfaTable.keys());

        // @ts-ignore
        const startState = nfaTable.get(nfaStates[0])![EPSILON_CLOSURE];

        // Stack contains unvisited states
        const stack = [startState];
        this.startingState = startState.join(',');
        const alphabet = this.nfa.getAlphabet();
        const acceptingStatesFromNfa = this.nfa.getAcceptingStateNumbers();

        const dfaTable = new Map();

        const updateAcceptingStates = (states: any[]) => {
            for (const acceptingState of acceptingStatesFromNfa) {
                // Any accepting state from the NFA is an accepting state
                // on the DFA
                if (states.indexOf(acceptingState) !== -1) {
                    this.acceptingStateNumbers.add(states.join(','));
                    break;
                }
            }
        }

        while (stack.length > 0) {
            const states = stack.shift();
            if (!states) {
                throw new Error("No stack");
            }
            const label = states.join(',');
            dfaTable.set(label, new Map<SN, SN>());

            for (const symbol of alphabet) {
                const statesOnCurrentSymbol = [];

                // Update status of the merged state
                // If a set of states contain at least an accepting state
                // The merged state is an accepting state
                updateAcceptingStates(states);

                // Compute and merge epsilon closure of
                // all reachable states on current symbol
                for (const state of states) {
                    const reachableStatesOnSymbol = this.nfa.getTransitionsOnSymbol(state, symbol);
                    if (!reachableStatesOnSymbol) {
                        continue;
                    }

                    for (const reachableStateOnSymbol of reachableStatesOnSymbol) {
                        const epsilonClosure = this.nfa.getTransitionsOnSymbol(reachableStateOnSymbol, EPSILON_CLOSURE);
                        if (!epsilonClosure) {
                            continue;
                        }
                        statesOnCurrentSymbol.push(
                            ...epsilonClosure
                        );
                    }
                }

                // Filter duplicates states if any
                const dfaStatesOnSymbol = Array.from(new Set(statesOnCurrentSymbol));

                // Set merged states on dfa table
                // Add computed label to stack if not present
                if (dfaStatesOnSymbol.length > 0) {
                    const dfaOnSymbolLabel = dfaStatesOnSymbol.join(',');

                    dfaTable.get(label)!.set(symbol, dfaOnSymbolLabel);

                    if (!dfaTable.has(dfaOnSymbolLabel)) {
                        stack.unshift(dfaStatesOnSymbol);
                    }
                }
            }

        }

        this.logger.debug("*** BEGIN DFA ***");
        this.logger.debug("DFA Transition table")
        this.logger.debug(dfaTable);
        this.logger.debug("*** END DFA ***");

        return this.transitionMap = dfaTable;
    }

    /**
     * Checks if a whole string match the regular expression
     * If not then removes character one by one and check again
     * @param string
     */
    match(string: string): Array<Array<number>> {
        const result = []
        for (let i = 0; i < string.length; ++i) {
            const last = this._match(string.slice(i));
            if (last !== -1) {
                result.push([i, i+last]);
            }
        }
        return result;
    }

    /**
     * Checks whether a whole string match the regular expression
     * @return last index of where the string matched
     * @return -1 if there's no match
     * @param string
     */
    private _match(string: string): number {
        let state = this.getStartingState(); // starting state
        let i = 0;
        const table = this.getTransitionTable();
        const acceptingStates = this.getAcceptingStateNumbers();

        while (string[i]) {
            const stateArray = table.get(state)!.get(string[i++]);
            if (!stateArray) {
                return -1;
            }
            state = stateArray;
            if (acceptingStates.has(state)) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Return accepting state numbers for this DFA
     */
    getAcceptingStateNumbers(): Set<SN> {
        if (!this.acceptingStateNumbers) {
            this.getTransitionTable();
        }
        return this.acceptingStateNumbers;
    }

    /**
     * Return starting state
     */
    getStartingState(): SN {
        if (!this.startingState) {
            this.getTransitionTable();
        }
        return this.startingState;
    }
}
