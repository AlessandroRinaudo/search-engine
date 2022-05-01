/**
 * Abstract class to construct finite automaton
 */
import {NFA} from "./nfa";
import {RegExParser} from "../parser/parser";
import {Transformer} from "../transformer/transformer";
import {DFA} from "./dfa";
import {Log} from "../utils/logger";

export abstract class FA {

    /**
     * Builds an NFA from a regex string
     * @param expression
     */
    static createNFA(expression: string): NFA {
        const parser = new RegExParser(expression);
        const tree = parser.parse();
        const log = Log.getInstance();
        log.debug("\n*** BEGIN PARSING ***");
        log.debug("RegExTree representation in string")
        log.debug(tree.toString());
        log.debug("*** END PARSING ***");
        const transformer = new Transformer(tree);
        return transformer.transform();
    }

    /**
     * Builds a DFA from a regex strin
     * @param expression
     */
    static createDFA(expression: string): DFA {
        return new DFA(FA.createNFA(expression));
    }

}
