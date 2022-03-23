import {Request, Response} from "express";
import IBookModel from "../models/Book";
import {handleErrors, handleSuccess} from "../utils/requests";

/**
 * GET search for a book with given criteria
 */
const search = async (req: Request, res: Response) => {
    try {
        const data = await IBookModel.find({})
        handleSuccess(req, res, data)
    } catch (e) {
        handleErrors(req, res, e.message)
    }
}

export const search_controller = {
    search
}
