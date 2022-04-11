import {Document, Model, model, Schema} from "mongoose";


export interface IWord {
    name: string;
    score: number;
}
export interface IFwdIndex {
    id_book: string;
    words: IWord[]
}

interface IFwdIndexDocument extends Document, IFwdIndex {

}

const fwdIndexSchema: Schema<IFwdIndexDocument> = new Schema({
    id_book: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    words:[{
        name: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: true,
            default: 0
        }
    }]
});

const IFwdIndexModel: Model<IFwdIndexDocument> = model("IFwdIndexDocument", fwdIndexSchema);

export default IFwdIndexModel;
