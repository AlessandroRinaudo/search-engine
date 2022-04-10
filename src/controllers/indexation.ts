import {Request, Response} from "express";
import {tokenization} from "../utils/tokenize";
import IFwdIndexModel, {IFwdIndex} from "../models/FwdIndex";
import {handleErrors, handleSuccess} from "../utils/requests";
import IBwdIndexModel, {IBookScore} from "../models/BwdIndex";
import * as es from "event-stream";
import fs from "fs";

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

        let indexed_book_cpt = 0
        const indexed_arr: IFwdIndex[] = []

        const s = fs.createReadStream(file)
            .pipe(es.split())
            .pipe(es.mapSync(async function (line: string) {
                    s.pause();
                    // Tokenize and count file
                    const tokens: string[] = tokenization.tokenize_line(line)
                    const indexed: IFwdIndex = await tokenization.count(id_book, tokens)
                        .catch(error => {
                            throw new Error(error)
                        })
                    indexed_book_cpt++;
                    indexed_arr.push(indexed)
                    s.resume();
                })
                    .on('error', function (err) {
                        console.log('Error:', err);
                        throw new Error(err)
                    })
                    .on('end', async function () {
                        // Insert or replace document into db if exists
                        await IFwdIndexModel.findOneAndUpdate(
                            {
                                id_book: id_book
                            }, {
                                '$push': {
                                    'words': indexed_arr
                                }
                            }, {
                                upsert: true, returnDocument: 'after'
                            }
                        )
                        const data = "Forward index : " + indexed_book_cpt + " books indexed successfully"
                        handleSuccess(req, res, data)
                    })
            );

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
            for (let index of book.words) {
                try {
                    await findOneAndUpdateScore(book.id_book, index.name, index.score)
                    index_updated_cpt++
                } catch (e) {
                    console.error("Could not update " + e.message)
                    index_error_cpt++
                }
            }
        }
        const data = "Backward index : " + index_updated_cpt + " words created/updated successfully with " + index_error_cpt + " error"
        handleSuccess(req, res, data)
    } catch (e) {
        handleErrors(req, res, e.message)
    }
}


const findOneAndUpdateScore = async (id_book: string, word: string, count: number) => {
    // Find the corresponding word in backward index
    // Compute score
    const bookScore: IBookScore = {
        id_book,
        score: count
    }
    await IBwdIndexModel.findOneAndUpdate({
            word: word
        },
        {
            '$push': {'id_books': bookScore}
        },
        {
            upsert: true,
            runValidators: true
        }
    )
}


export const indexation = {
    fwd_index,
    bwd_index
}