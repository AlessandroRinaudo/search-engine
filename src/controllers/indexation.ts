import {Request, Response} from "express";
import {tokenization} from "../utils/tokenize";
import IFwdIndexModel, {IFwdIndex} from "../models/FwdIndex";
import {handleErrors, handleSuccess} from "../utils/requests";


const fwd_index = async (req: Request, res: Response) => {
    try {
        // TODO: Get from request or extract from dir
        const file = "data/book.txt"
        const id = "123"

        // Tokenize and count file
        const tokens = await tokenization.tokenize_file(file)
        const indexed: IFwdIndex = tokenization.count(id, tokens)

        // Insert or replace document into db if exists
        const data = await IFwdIndexModel.findOneAndReplace(
            {id_book: id}, indexed, {upsert: true}
        )
        handleSuccess(req, res, data)
    } catch (e) {
        handleErrors(req, res, e.message)
    }
}

const bwd_index = async (req: Request, res: Response) => {
    try {
        /*
         TODO:
          - Get all data from fwd index
          - Construct bwd index from data
         */
        const data = "Not Implemented yet"
        handleSuccess(req, res, data)
    } catch (e) {
        handleErrors(req, res, e.message)
    }
}

export const indexation = {
    fwd_index,
    bwd_index
}