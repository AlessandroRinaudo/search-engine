import {Request, Response} from "express";
import IBookModel from "../models/Book";
import {handleErrors, handleSuccess} from "../utils/requests";
import IBwdIndexModel, {IBwdIndex} from "../models/BwdIndex";

/**
 * GET search for a book with given criteria
 */
const search = async (req: Request, res: Response) => {
    try {
        // Find words in bwd index
        const words: string[] = (<string>req.query.q).split(" ");
        const page = parseInt(<string>req.query.page) || 1;
        const limit = parseInt(<string>req.query.limit) || 3;

        const indexes = await IBwdIndexModel
            .find({'word': {$in: words}})

        // Keep only highest score for each word
        const id_books = new Map<string, number>()
        indexes.forEach((index: IBwdIndex) => {
            index.id_books.forEach((score: number, id_book) => {
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
            .skip((page-1) * limit)
            .limit(limit)
        const total = await IBookModel.find(query).countDocuments()
        handleSuccess(req, res, data, {
            count: total
        })
    } catch (e) {
        handleErrors(req, res, e.message)
    }
}

export const search_controller = {
    search
}
