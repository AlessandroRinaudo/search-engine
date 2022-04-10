import {Request, Response} from "express";
import {handleErrors, handleSuccess} from "../utils/requests";
import IBookModel, {IBook} from "../models/Book";

/**
 * POST Insert a book
 * /book/
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

/**
 * GET a book
 * /book/:id
 */
const get = async (req: Request, res: Response) => {
    try {
        const id_book: string = req.params.id
        const data = await IBookModel.findOne({id_book: id_book})
        handleSuccess(req, res, data)
    } catch (e) {
        handleErrors(req, res, e.message)
    }
}

/**
 * Find
 * /book/
 */
const find = async (req: Request, res: Response) => {
    try {
        const filter = <object>req.query?.filter || {};
        const limit = parseInt(<string>req.query.limit) || 20;
        const sort= <string>req.query?.sort || ""
        const data = await IBookModel.find({...filter},).sort(
            parse_sort(sort)
        ).limit(limit)
        handleSuccess(req, res, data)
    } catch (e) {
        handleErrors(req, res, e.message)
    }
}

const parse_sort = (str: string): Record<string, number> => {
    if(str === "") {
        return {}
    }
    let order;
    if (str[0] === "-") {
        order = -1
    } else {
        order = 1
    }
    return {
        [str.slice(0).trim()]: order
    }
}

export const book = {
    insert,
    get,
    find
}