import {State} from "./state";
import {EPSILON} from "../constants";

/**
 * NFA state.
 *
 * Allows nondeterministic transitions to several states on the
 * same symbol, and also epsilon-transitions.
 */

export class NFAState extends State {

    /**
     * Whether this state matches a string.
     *
     * We maintain set of visited epsilon-states to avoid infinite loops
     * when an epsilon-transition goes eventually to itself.
     **/

    match(string: string, visited = new Set<State>()): boolean {
        if (visited.has(this)) {
            return false;
        }

        visited.add(this);
        // Base case
        if (string.length === 0) {
            if (this.accepting) {
                return true;
            }

            // Check if any epsilon transition gets to an accepted state
            for (let nextState of this.getTransitionsForSymbol(EPSILON)) {
                if (nextState.match('', visited)) {
                    return true;
                }
            }
            return false;
        }

        const symbol = string[0];
        const rest = string.slice(1);

        // Check if all transitions from the current symbol gets to an accepted state
        for (let nextState of this.getTransitionsForSymbol(symbol)) {
            if (nextState.match(rest)) {
                return true;
            }
        }

        // Check if any epsilon transition from original symbol gets to an accepted state
        for (let nextState of this.getTransitionsForSymbol(EPSILON)) {
            if (nextState.match(string, visited)) {
                return true;
            }
        }

        return false;
    }
}
