import { Document, Model, model, Schema } from "mongoose";


export interface SuggestedBooks {
  id_book: string;
  suggested_books: string[]
}

interface SuggestedBooksDocument extends Document, SuggestedBooks {

}

const bookSchema: Schema<SuggestedBooksDocument> = new Schema({
  id_book: String,
  suggested_books: [String]
});

const SuggestedBooksModel: Model<SuggestedBooksDocument> = model("SuggestedBooksDocument", bookSchema);

export default SuggestedBooksModel;
