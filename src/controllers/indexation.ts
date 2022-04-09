import {Request, Response} from "express";
import {tokenization} from "../utils/tokenize";
import IFwdIndexModel, {IFwdIndex} from "../models/FwdIndex";
import {handleErrors, handleSuccess} from "../utils/requests";
import IBwdIndexModel, {IBwdIndex} from "../models/BwdIndex";

/**
 * POST forward index a book
 * Body : filename, id_book
 */
const fwd_index = async (req: Request, res: Response) => {
    try {
        // Base directory
        const dir = "data/"
        const file = dir + req.body["file"]
        const id_book = req.body["id_book"]

        // Tokenize and count file
        const tokens = await tokenization.tokenize_file(file)
        const indexed: IFwdIndex = tokenization.count(id_book, tokens)

        // Insert or replace document into db if exists
        const data = await IFwdIndexModel.findOneAndReplace(
            {id_book: id_book}, indexed, {upsert: true}
        )
        handleSuccess(req, res, data)
    } catch (e) {
        handleErrors(req, res, e.message)
    }
}

/**
 * POST backward index all books
 * Body : None
 */
const bwd_index = async (req: Request, res: Response) => {
    try {
        const books: IFwdIndex[] = await IFwdIndexModel.find({})
        let index_updated_cpt = 0
        let index_error_cpt = 0
        for (let book of books) {
            for (let [word, count] of book.words) {
                try {
                    await findOneAndUpdateScore(book.id_book, word, count)
                    index_updated_cpt++
                } catch (e) {
                    console.error("Could not update " + e.message)
                    index_error_cpt++
                }
            }
        }
        const data = "Backward index : " + index_updated_cpt + " created/updated successfully with " + index_error_cpt + " error"
        handleSuccess(req, res, data)
    } catch (e) {
        handleErrors(req, res, e.message)
    }
}


const findOneAndUpdateScore = async (id_book: string, word: string, count: number) => {
    // Find the corresponding word in backward index
    // Compute score
    let bwd_index: IBwdIndex =
        await IBwdIndexModel.findOne({word: word})
    if (!bwd_index) {
        bwd_index = {
            word: word,
            id_books: new Map<string, number>()
        }
    }
    bwd_index.id_books.set(id_book, count)

    // Update word with new book id and score
    const inserted_bwd_index =
        await IBwdIndexModel.findOneAndUpdate(
            {word: bwd_index.word},
            bwd_index,
            {upsert: true}
        )
}

export const indexation = {
    fwd_index,
    bwd_index
}