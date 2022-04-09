/**
 * FA State class.
 */
import {EPSILON} from "../constants";

export class State implements IState {
    accepting: boolean;
    transitionsMap: Map<string, Set<State>>;
    label!: number;
    epsilonClosure!: Set<State>;

    constructor({accepting = false} = {}) {
        this.accepting = accepting;
        this.transitionsMap = new Map<string, Set<State>>();
    }

    /**
     * Creates a transition for symbol
     * @param symbol
     * @param state
     */
    addTransitionForSymbol(symbol: string, state: State): void {
        this.getTransitionsForSymbol(symbol).add(state);
        return;
    }

    /**
     * Returns transitions on symbol
     * @param symbol
     */
    getTransitionsForSymbol(symbol: string): Set<State> {
        let transitions = this.transitionsMap.get(symbol);
        if(!transitions) {
            transitions = new Set<State>()
            this.transitionsMap.set(symbol, transitions)
        }
        return transitions;
    }

    match(string: string, visited?: Set<State>): boolean {
        throw new Error('Not implemented');
    }

    /**
     * Return the e-closure of this state
     * self + all states following e-transitions
     */
    getEpsilonClosure(): Set<State> {
        if(!this.epsilonClosure) {
            const closure = new Set<State>();
            this.epsilonClosure = closure;
            closure.add(this);
            const epsilonTransitions: Set<State> = this.getTransitionsForSymbol(EPSILON);
            for(const nextState of epsilonTransitions) {
                if(closure.has(nextState)) {
                    continue;
                }
                const nextClosure = nextState.getEpsilonClosure();
                nextClosure.forEach(state => closure.add(state));
            }
        }
        return this.epsilonClosure;
    }

    /**
     * Returns transitions for this state
     */
    getTransitions() {
        return this.transitionsMap;
    }
}

export interface IState {
    label: number;
    match(string: string, visited?: Set<State>): boolean;
}

export type SN = string | number;

export type ITransition = {
    [key in SN]: SN[];
};

