import {Document, Model, model, Schema} from "mongoose";

export interface IFwdIndex {
    id_book: string;
    words: Map<string, number>;
}

interface IFwdIndexDocument extends Document {

}

const fwdIndexSchema: Schema<IFwdIndexDocument> = new Schema({
    id_book: {
        type: String,
        required: true,
        unique: true
    },
    words: {
        type: Map,
        of: String,
        to: Number
    }
});

const IFwdIndexModel: Model<IFwdIndexDocument> = model("IFwdIndexDocument", fwdIndexSchema);

export default IFwdIndexModel;
