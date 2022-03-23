import {Request, Response} from "express";
import {handleErrors, handleSuccess} from "../utils/requests";
import IBookModel, {IBook} from "../models/Book";

/**
 * POST Insert a book
 * Body :
 */
const insert = async (req: Request, res: Response) => {
    try {
        const id_book: string = req.body.id
        delete req.body.id
        const book: IBook = req.body
        book.id_book = id_book

        const data = await IBookModel.create(book)
        handleSuccess(req, res, data)
    } catch (e) {
        handleErrors(req, res, e.message)
    }
}

export const book = {
    insert
}