#!/usr/bin/env node
import yargs from "yargs/yargs";
import readline from "readline";
import fs from "fs";
import {highlightMatches, isRegex} from "../utils/utils";
import {FA} from "../automata/fa";
import {Log} from "../utils/logger";
import { KMP } from "../KMP/KMP";
import {DFA} from "../automata/dfa";
import {StringBuilder} from "typescript-string-operations";


const matchFile = (expression: string, path: string, verbose: boolean, useDfa: boolean) => {

    if (verbose)
        Log.getInstance().setMode("verbose");

    const readInterface = readline.createInterface({
        input: fs.createReadStream(path),
    });

    const lineCounter = ((i = 0) => () => ++i)();

    const log = Log.getInstance();

    log.debug("\n*** BEGIN MATCHING *** \n");

    const is_regex = isRegex(expression);

    let dfa: DFA;
    if(is_regex || useDfa) {
        dfa = FA.createDFA(expression);
        log.debug("USING DFA TO MATCH STRING\n");
    } else {
        log.debug("USING KMP TO MATCH STRING\n");
    }

    const builder = new StringBuilder();

    readInterface.on('line', function (line, lineno = lineCounter()) {
        let res;
        if (is_regex || useDfa) {
            res = dfa.match(line);
        } else {
            res = KMP.kmpSearch(line, expression);
        }
        if (res.length > 0) {
            builder.Append(`[${lineno}] `);
            // process.stdout.write(`[${lineno}] `);
            builder.Append(highlightMatches(line, res))
            builder.Append('\n');
        }
    });

    readInterface.on('close', () => {
        console.log(builder.ToString());
        Log.getInstance().debug("\n*** END MATCHING ***");
    })
}

const y = yargs();

y.version('1.0.0');

y.usage(
    `$0 <regex> <file>`,
    'Usage : node . "S(a|r|g|)*on" 56667-0.txt',
    {
        regex: {
            describe: 'RegEx',
            demandOption: true,
            type: 'string'
        },
        file: {
            describe: 'Text to match',
            demandOption: true,
            type: 'string'
        }
    },
    (argv) => matchFile(argv.regex, argv.file, !!argv.verbose, !!argv.dfa)
).option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
}).option('dfa', {
    alias: 'd',
    type: 'boolean',
    description: 'Use deterministic finite automaton'
});

y.help(
    'help',
    'Show usage instruction'
);

y.parse(process.argv.slice(2))
