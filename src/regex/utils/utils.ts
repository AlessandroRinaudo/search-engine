import {DFA} from "../automata/dfa";
import {RegExParser} from "../parser/parser";
import {Transformer} from "../transformer/transformer";
import "colors";
import { StringBuilder } from 'typescript-string-operations';

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
 * Print string and highlight words in indices
 * @param string
 * @param indices
 */
export const highlightMatches = (string: string, indices: Array<Array<number>>): string => {
    let last = 0;

    const builder = new StringBuilder();

    indices.forEach((index) => {
        for (let i = last; i < string.length; ++i) {
            if (i == index[0]) {
                const part = `${string.slice(index[0], index[1])}`.bgGreen;
                builder.Append(part);
                // process.stdout.write(part);
                last = index[1];
                i = last;
                break;
            } else {
                // process.stdout.write(string[i]);
                builder.Append(string[i]);
            }
        }
    });

    if(last !== string.length) {
        builder.Append(string.slice(last))
        // process.stdout.write(string.slice(last));
    }

    // builder.Append('\n');
    // process.stdout.write('\n');

    return builder.ToString();
}

/**
 * Returns true if this string str is a RegExp
 * @param string
 */
 export function isRegex(str: string): boolean {
    if (str.includes("|")) return true;
    if (str.includes("*")) return true;
    return false;
}
