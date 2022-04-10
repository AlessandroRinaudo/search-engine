/**
 * Tokenize the string and transform into a list of words
 */
import * as fs from "fs";
import {IFwdIndex, IWord} from "../models/FwdIndex";
import Tokenizer, {Token} from "wink-tokenizer";

const tokenize = (line: string): string[] => {
    const tokenizer = new Tokenizer();
    const tokens: Token[] = tokenizer.tokenize(line);
    return tokens
        .filter(t => t.tag === "word" && t.value.length > 3)
        .map(t => t.value.toLowerCase())
}

const count = (id: string, tokens: string[]): Promise<IFwdIndex> => {
    return new Promise(((resolve, reject) => {
        const index: Map<string, number> = new Map<string, number>()
        // Count each occurrence of word
        tokens.forEach(word => {
            if (!index.has(word)) {
                index.set(word, 1);
            } else {
                index.set(word, index.get(word) + 1)
            }
        })
        const words = []
        // Construct IFwdIndex
        for (const key of index.keys()) {
            try {
                const bookScore: IWord = {
                    name: key,
                    score: index.get(key)
                }
                words.push(bookScore)
            } catch (e) {
                console.error("Could not create object: " + e)
            }
        }
        resolve({
            id_book: id,
            words
        })
    }))
}

/**
 * Open a file in readonly and tokenize each line
 */
const tokenize_file = async (file: string): Promise<string[]> => {
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
const tokenize_dir = async (dir: string): Promise<string[][]> => {
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
    tokenize_line: tokenize,
    tokenize_file,
    tokenize_dir,
    count
}