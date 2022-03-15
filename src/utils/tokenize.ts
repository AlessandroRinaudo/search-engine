/**
 * Tokenize the string and transform into a list of words
 */
import * as fs from "fs";

const tokenize = (line: String): String[] => {
    return line.split(/\s+/);
}

/**
 * Open a file in readonly and tokenize each line
 */
const tokenize_file = async (file: String): Promise<String[]> => {
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
export const tokenize_dir = async (dir: String): Promise<String[][]> => {
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