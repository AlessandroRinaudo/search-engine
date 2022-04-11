import {Request, Response} from "express";
import {tokenization} from "../utils/tokenize";
import IFwdIndexModel, {IFwdIndex, IWord} from "../models/FwdIndex";
import {handleErrors, handleSuccess} from "../utils/requests";
import IBwdIndexModel, {IBookScore} from "../models/BwdIndex";
import * as es from "event-stream";
import fs from "fs";
import * as assert from "assert";

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

/**
 * Closeness centrality algorithm to sort books by importance order
 * @param req
 * @param res
 */

const closeness = async (req: Request, res: Response) => {

    const adjacency_list = [
        {id: 10, suggestedBooks: [20, 30, 40, 50]},
        {id: 20, suggestedBooks: [10, 20]},
        {id: 30, suggestedBooks: [10, 40]},
        {id: 40, suggestedBooks: [10, 30]},
        {id: 50, suggestedBooks: [10]},
    ]

    const id_to_num = new Map<number, number>();
    const num_to_id = new Map<number, number>();
    let vertex_len = 0;

    for (const row of adjacency_list) {
        id_to_num.set(row.id, vertex_len);
        num_to_id.set(vertex_len, row.id);
        vertex_len++;
    }

    // construct adjacency and weight matrix
    const adjacency_matrix = new Array<Array<number>>(vertex_len);
    const weight_matrix = new Array<Array<number>>(vertex_len)
    for (let i = 0; i < vertex_len; i++) {
        for (let j = 0; j < vertex_len; j++) {
            if (!adjacency_matrix.at(i)) {
                adjacency_matrix[i] = new Array<number>(vertex_len)
            }
            adjacency_matrix[i][j] = 0;

            if (!weight_matrix.at(i)) {
                weight_matrix[i] = new Array<number>(vertex_len)
            }
            if (i == j) {
                weight_matrix[i][j] = 0
            } else {
                weight_matrix[i][j] = Number.MAX_SAFE_INTEGER
            }
        }
    }


    // Initialize weight
    for (const row of adjacency_list) {
        for (const col of row.suggestedBooks) {
            const i = id_to_num.get(row.id)
            const j = id_to_num.get(col);
            if (i != j) {
                weight_matrix[i][j] = 1
            }
        }
    }

    // Floyd-Warshall
    for (let k = 0; k < vertex_len; k++) {
        for (let i = 0; i < vertex_len; i++) {
            for (let j = 0; j < vertex_len; j++) {
                const cur_weight = weight_matrix.at(i).at(j)
                const new_weight = weight_matrix.at(i).at(k) + weight_matrix.at(k).at(j)
                if (cur_weight > new_weight) {
                    weight_matrix[i][j] = new_weight
                }
            }
        }
    }

    const cranks = []
    for (const row of adjacency_list) {
        cranks.push({
            id: row.id,
            score: crank(id_to_num.get(row.id), weight_matrix)
        })
    }

    const data = cranks
    handleSuccess(req, res, data)
}

/**
 * Closeness centrality
 * n-1 / Sum d(u,v) where u != v
 * d(u,v) the shortest path from u to v, number of nodes minimum
 * @param nodes
 * @param di
 */
const crank = (node: number, weight_matrix: number[][]) => {
    const v = weight_matrix.length
    let sum = 0
    for (let i = 0; i < v; i++) {
        if (i != node) {
            sum += weight_matrix[i][node]
        }
    }
    if (sum === 0 || isNaN(sum)) {
        return 0
    }
    return (v - 1) / sum

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
    closeness
}