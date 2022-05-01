import {Document, Model, model, Schema} from "mongoose";

interface IAuthor {
    name: string,
    birth_year: number,
    death_year: number
}

export interface IBook {
    id_book: string;
    title: string;
    authors: IAuthor[];
    translators: IAuthor[];
    subjects: string[];
    bookshelves: string[];
    languages: string[];
    copyright: boolean;
    mediatype: string;
    formats: Record<string, string>
    download_count: number
}

interface IBookDocument extends Document, IBook {

}

const bookSchema: Schema<IBookDocument> = new Schema({
    id_book: String,
    title: String,
    authors: [{
        name: String,
        birth_year: Number,
        death_year: Number
    }],
    translators: [{
        name: String,
        birth_year: Number,
        death_year: Number
    }],
    subjects: [String],
    bookshelves: [String],
    languages: [String],
    copyright: Boolean,
    mediatype: String,
    formats: {
        type: Map,
        of: String,
        to: String
    },
    download_count: Number
});

const IBookModel: Model<IBookDocument> = model("IBookDocument", bookSchema);

export default IBookModel;
