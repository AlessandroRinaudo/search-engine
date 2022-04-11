import {Request, Response} from "express";
import {tokenization} from "../utils/tokenize";
import IFwdIndexModel, {IFwdIndex, IWord} from "../models/FwdIndex";
import {handleErrors, handleSuccess} from "../utils/requests";
import IBwdIndexModel, {IBookScore} from "../models/BwdIndex";
import * as es from "event-stream";
import fs from "fs";


/**
 * GET a forward indexed book
 * Body : id_book
 */
 const fwd_book = async (req: Request, res: Response) => {
    try {
        const id_book = req.params.id

        const data = await IFwdIndexModel.find({ id_book: id_book })

        handleSuccess(req, res, data)
    } catch (e) {
        handleErrors(req, res, e.message)
    }
}


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

        const indexed_arr: IFwdIndex[] = []

        const s = fs.createReadStream(file)
            .pipe(es.split())
            .pipe(es.mapSync(async function (line: string) {
                    s.pause();
                    // Tokenize and count file
                    if (line.trim().length > 1) {
                        const tokens: string[] = tokenization.tokenize_line(line)
                        const indexed: IFwdIndex = await tokenization.count(id_book, tokens)
                            .catch(error => {
                                throw new Error(error)
                            })
                        indexed_arr.push(indexed)
                    }
                    s.resume();
                })
                    .on('error', function (err) {
                        console.log('Error:', err);
                        throw new Error(err)
                    })
                    .on('end', async function () {
                        // Insert or replace document into db if exists
                        const word_count: Map<string, number> = new Map<string, number>()
                        for (let indexed of indexed_arr) {
                            for (let word of indexed.words) {
                                const key = word.name
                                if (!word_count.has(key)) {
                                    word_count.set(key, word.score);
                                } else {
                                    word_count.set(key, word_count.get(key) + word.score)
                                }
                            }
                        }
                        const word_score: IWord[] = []
                        for (const word of word_count.keys()) {
                            word_score.push({
                                name: word,
                                score: word_count.get(word)
                            })
                        }
                        await IFwdIndexModel.findOneAndUpdate(
                            {
                                id_book: id_book
                            }, {
                                '$push': {
                                    'words': word_score
                                }
                            }, {
                                upsert: true, returnDocument: 'after'
                            }
                        )
                        const data = "Forward index id : " + id_book + " book indexed successfully"
                        handleSuccess(req, res, data)
                    })
            );

    } catch (e) {
        handleErrors(req, res, e.message)
    }
}

/**
 * POST backward index all books one by one
 * Body : id_book
 */
const bwd_index = async (req: Request, res: Response) => {
    try {
        const id_book = <string>req.body["id_book"]
        let index_updated_cpt = 0
        let index_error_cpt = 0
        let book_cursor = await IFwdIndexModel.find({id_book: id_book}).cursor()
        await book_cursor.eachAsync(async (book) => {
            let tasks = []
            for (let index of book.words) {
                try {
                    tasks.push(findOneAndUpdateScore(book.id_book, index.name, index.score))
                    index_updated_cpt++
                } catch (e) {
                    console.error("Could not update " + e.message)
                    index_error_cpt++
                }
            }
            await Promise.all(tasks)
        })
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
    bwd_index,
    fwd_book
}