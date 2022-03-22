import {Document, Model, model, Schema} from "mongoose";

export interface IBwdIndex {
    word: string;
    id_books: Map<string, number>;
}

interface IBwdIndexDocument extends Document, IBwdIndex {

}

const bwdIndexSchema: Schema<IBwdIndexDocument> = new Schema({
    word: {
        type: String,
        required: true,
        unique: true
    },
    id_books: {
        type: Map,
        of: String,
        to: Number
    }
});

const IBwdIndexModel: Model<IBwdIndexDocument> = model("IBwdIndexDocument", bwdIndexSchema);

export default IBwdIndexModel;
