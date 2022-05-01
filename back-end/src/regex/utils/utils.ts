import {DFA} from "../automata/dfa";
import {RegExParser} from "../parser/parser";
import {Transformer} from "../transformer/transformer";

/**
 * Creates a DFA from a regex expression
 */

export const parse = (expression: string): DFA => {
    const parser = new RegExParser(expression);
    const tree = parser.parse();
    const transformer = new Transformer(tree);
    return new DFA(transformer.transform());
}

/**
 * Returns true if this string str is a RegExp
 * @param str
 */
 export function isRegex(str: string): boolean {
    let isValid = true;
    try {
        new RegExp(str);
    } catch(e) {
        isValid = false;
    }
    return isValid;
}
