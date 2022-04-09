/**
 * Tokenize the string and transform into a list of words
 */
import * as fs from "fs";
import {IFwdIndex} from "../models/FwdIndex";
import Tokenizer, {Token} from "wink-tokenizer";

const tokenize = (line: string): Token[] => {
    const tokenizer = new Tokenizer();
    return tokenizer.tokenize(line);
}

const count = (id: string, tokens: Token[]): IFwdIndex => {
    const index: Map<string, number> = new Map<string, number>()
    tokens.forEach(word => {
        if (word.tag === "word") {
            if (!index.has(word.value)) {
                index.set(word.value, 1);
            } else {
                index.set(word.value, index.get(word.value) + 1)
            }
        }
    })
    return {
        id_book: id,
        words: index
    }
}

/**
 * Open a file in readonly and tokenize each line
 */
const tokenize_file = async (file: string): Promise<Token[]> => {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile("" + file,
                {encoding: 'utf8', flag: 'r'},
                function (err, data) {
                    if (err)
                        reject("Could not parse file " + file + " with " + err);
                    else
                        resolve(tokenize(data))
                });
        } catch (e) {
            reject("Could not parse file " + file + " with " + e);
        }
    })
}

/**
 * Open a directory and tokenize each file
 */
const tokenize_dir = async (dir: string): Promise<Token[][]> => {
    return new Promise((resolve, reject) => {
        try {
            fs.readdir("" + dir,
                function (err, files) {
                    if (err)
                        reject("Could not read dir: " + dir + " with " + err);
                    else {
                        const tokenized = files.map(f => tokenize_file(dir + "/" + f))
                        resolve(Promise.all(tokenized));
                    }
                });
        } catch (e) {
            reject("Could not parse dir" + dir + " with " + e);
        }
    })
}


export const tokenization = {
    tokenize_file,
    tokenize_dir,
    count
}