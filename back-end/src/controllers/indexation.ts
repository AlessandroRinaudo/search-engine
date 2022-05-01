import {Request, Response} from "express";
import {tokenization} from "../utils/tokenize";
import IFwdIndexModel, {IFwdIndex, IWord} from "../models/FwdIndex";
import SuggestedBooksModel from "../models/Suggested";
import {handleErrors, handleSuccess} from "../utils/requests";
import IBwdIndexModel, {IBookScore} from "../models/BwdIndex";
import * as es from "event-stream";
import fs from "fs";
import IBookModel from "../models/Book";


/**
 * GET a forward indexed book
 */
const fwd_books = async (req: Request, res: Response) => {
    try {

        const data = await IFwdIndexModel.find().select('id_book')

        handleSuccess(req, res, data)
    } catch (e) {
        handleErrors(req, res, e.message)
    }
}


/**
 * GET a forward indexed book
 * Body : id_book
 */
const fwd_book = async (req: Request, res: Response) => {
    try {
        const id_book = req.params.id

        const data = await IFwdIndexModel.find({id_book: id_book})

        handleSuccess(req, res, data)
    } catch (e) {
        handleErrors(req, res, e.message)
    }
}

/**
 * POST a suggested books
 * Body : id_book, suggested_books
 */
const suggested_books = async (req: Request, res: Response) => {
    try {
        const id_book = req.body.id_book
        const suggested_books = req.body.suggested_books

        const data = await SuggestedBooksModel.create({id_book: id_book, suggested_books: suggested_books})

        handleSuccess(req, res, data)
    } catch (e) {
        handleErrors(req, res, e.message)
    }
}


/**
 * Get suggested books for a book
 * Param : id_book
 */
const suggested_book = async (req: Request, res: Response) => {
    try {
        const id_book = req.params.id
        const data = await SuggestedBooksModel.findOne({id_book: id_book})
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

/**
 * Closeness centrality algorithm to sort books by importance order
 * @param req
 * @param res
 */

const closeness = async (req: Request, res: Response) => {

    const adjacency_list = await SuggestedBooksModel.find({})

    const id_to_num = new Map<string, number>();
    const num_to_id = new Map<number, string>();
    let vertex_len = 0;
    const id_set = new Set<string>();

    for (const row of adjacency_list) {
        id_set.add(row.id_book)
        for (const id of row.suggested_books) {
            id_set.add(id)
        }
    }

    for (const id of id_set) {
        id_to_num.set(id, vertex_len);
        num_to_id.set(vertex_len, id);
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
        for (const col of row.suggested_books) {
            const i = id_to_num.get(row.id_book)
            const j = id_to_num.get(col)
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

    let cranks = []
    for (const row of adjacency_list) {
        cranks.push({
            id: row.id_book,
            score: crank(id_to_num.get(row.id_book), weight_matrix)
        })
    }
    cranks.sort((a,b) => b.score - a.score)

    let limit = 0
    const data = []
    for(const crank of cranks) {
        const book = await IBookModel.findOne({id_book: crank.id})
        if(book) {
            limit++;
            data.push({
                ...book.toObject(),
                score: crank.score
            })
        }
        if(limit > 10) {
            break
        }
    }
    handleSuccess(req, res, data)
}

/**
 * Closeness centrality
 * n-1 / Sum d(u,v) where u != v
 * d(u,v) the shortest path from u to v, number of nodes minimum
 */
const crank = (node: number, weight_matrix: number[][]) => {
    const v = weight_matrix.length
    let sum = 0
    for (let i = 0; i < v; i++) {
        if (i != node && weight_matrix[i][node] != Number.MAX_SAFE_INTEGER) {
            sum += weight_matrix[i][node]
        }
    }
    if (sum === 0 || isNaN(sum)) {
        return 0
    }
    return (v - 1) / sum

}


const jaccard = async (req: Request, res: Response) => {
    const id_book_1 = <string>req.body.id_book_1
    const id_book_2 = <string>req.body.id_book_2

    // Compute jaccard distance between these two id_s
    const book_1_words = await IFwdIndexModel.findOne({id_book: id_book_1})
    const book_2_words = await IFwdIndexModel.findOne({id_book: id_book_2})

    const set_words = new Set<string>()

    const index_book_1 = new Map<string, number>()
    for (const word of book_1_words.words) {
        const key = word.name
        index_book_1.set(key, word.score)
        set_words.add(key)
    }

    const index_book_2 = new Map<string, number>()
    for (const word of book_2_words.words) {
        const key = word.name
        index_book_2.set(key, word.score)
        set_words.add(key)
    }

    let sum_value = 0
    let sum_total = 0
    for (const word of set_words) {
        let k_1 = index_book_1.get(word) || 0
        let k_2 = index_book_2.get(word) || 0
        sum_value += Math.max(k_1, k_2) - Math.min(k_1, k_2)
        sum_total += Math.max(k_1, k_2)
    }

    let distance = sum_value / sum_total
    handleSuccess(req, res, distance)
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
    fwd_book,
    fwd_books,
    jaccard,
    suggested_books,
    suggested_book,
    closeness
}