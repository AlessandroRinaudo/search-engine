import {Request, Response} from "express";
import {tokenization} from "../utils/tokenize";
import IFwdIndexModel, {IFwdIndex} from "../models/FwdIndex";
import {handleErrors, handleSuccess} from "../utils/requests";
import IBwdIndexModel, {IBwdIndex} from "../models/BwdIndex";


const fwd_index = async (req: Request, res: Response) => {
    try {
        // TODO: Get from request or extract from dir
        const file = "data/book_1.txt"
        const id = "456"

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
        const books: IFwdIndex[] = await IFwdIndexModel.find({})
        let index_updated_cpt = 0
        let index_error_cpt = 0
        for (let book of books) {
            const total_count = compute_total_count(book)
            for (let [word, count] of book.words) {
                try {
                    await findOneAndUpdateScore(book.id_book, word, count, total_count)
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


const findOneAndUpdateScore = async (id_book: string, word: string, count: number, total_count: number) => {
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
    const score = compute_score(count, total_count);
    bwd_index.id_books.set(id_book, score)

    // Update word with new book id and score
    const inserted_bwd_index =
        await IBwdIndexModel.findOneAndUpdate(
            {word: bwd_index.word},
            bwd_index,
            {upsert: true}
        )
}


const compute_total_count = (book: IFwdIndex): number => {
    let sum = 0
    book.words
        .forEach(
            (count: number, word: string) => sum += +count)
    return sum
}


const compute_score = (count: number, total_count: number): number => {
    console.log(count)
    console.log(total_count)
    return count / total_count
}

export const indexation = {
    fwd_index,
    bwd_index
}