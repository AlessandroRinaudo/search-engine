import {Request, Response} from "express";
import IBookModel from "../models/Book";
import {handleErrors, handleSuccess} from "../utils/requests";
import IBwdIndexModel, {IBwdIndex} from "../models/BwdIndex";
import {isRegex} from "../regex/utils/utils";
import {FA} from "../regex/automata/fa";

/**
 * GET search for a book with given criteria
 */
const search = async (req: Request, res: Response) => {
    try {
        // Check if query is regex
        let words: string[] = (<string>req.query.q).split(" ");
        if (words.length == 1 && _isRegex(words[0].trim())) {
            const expression = _extractRegexPattern(words[0].trim())
            const dfa = FA.createDFA(expression);
            const indexes = await IBwdIndexModel.find({})
            const res: string[] = []
            indexes.forEach((index: IBwdIndex) => {
                const matched = dfa.match(index.word);
                if (matched.length > 0) {
                    res.push(index.word);
                }
            });
            words = res;
        }
        // Find words in bwd index
        const page = parseInt(<string>req.query.page) || 1;
        const limit = parseInt(<string>req.query.limit) || 3;

        const indexes = await IBwdIndexModel
            .find({'word': {$in: words}})

        // Keep only highest score for each word
        const id_books = new Map<string, number>()
        indexes.forEach((index: IBwdIndex) => {
            index.id_books.forEach(({id_book, score: _score}) => {
                const score = <number>_score // Cast Number to number
                if (id_books.has(id_book)) {
                    const current_score = id_books.get(id_book);
                    if (current_score < score) {
                        id_books.set(id_book, score);
                    }
                } else {
                    id_books.set(id_book, score);
                }
            });
        });

        // Query for correct books
        const ids: string[] = []
        id_books.forEach((score: number, id_book) => {
            ids.push(id_book);
        })
        const query = {'id_book': {$in: ids}}
        const data = await IBookModel
            .find(query)
            .skip((page - 1) * limit)
            .limit(limit)
        const total = await IBookModel.find(query).countDocuments()
        handleSuccess(req, res, data, {
            count: total
        })
    } catch (e) {
        handleErrors(req, res, e.message)
    }
}

const _isRegex = (str: string): boolean => {
    return str.at(0) === "[" && str.at(-1) === "]" && isRegex(_extractRegexPattern(str));
}

const _extractRegexPattern = (str: string): string => {
    return str.slice(1, -1);
}

export const search_controller = {
    search
}
