import {Document, Model, model, Schema} from "mongoose";

export interface IBookScore {
    id_book: string;
    score: Number;
}
export interface IBwdIndex {
    word: string;
    id_books: IBookScore[]
}

interface IBwdIndexDocument extends Document, IBwdIndex {

}

const bwdIndexSchema: Schema<IBwdIndexDocument> = new Schema({
    word: {
        type: String,
        required: true,
        unique: true
    },
    id_books: [
        {
            id_book: {
                type: String,
                required: true
            },
            score: {
                type: Number,
                required: true,
                default: 0
            }
        }
    ]
});

const IBwdIndexModel: Model<IBwdIndexDocument> = model("IBwdIndexDocument", bwdIndexSchema);

export default IBwdIndexModel;
