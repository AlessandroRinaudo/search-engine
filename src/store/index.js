import { createStore } from "vuex";
import { getLanguages, getBooksPerLanguage, getLocalBooks, getBooks, getBook, getSuggestedBooks, getImportantBooks, searchBooks } from "../service/books";

const store = createStore({
  state: {
    languages: [],
    localBooks: [],
    books: [],
    importantBooks: [],
    book: {},
    suggestedBooks: [],
    limit: 40,
  },
  mutations: {
    storeLanguages: (state, languages) => {
      state.languages = languages;
    },
    storeLocalBooks: (state, localBooks) => {
      state.localBooks = localBooks;
    },
    storeBooks: (state, books) => {
      state.books = books;
    },
    storeBook: (state, book) => {
      state.book = book;
    },
    storeSuggestedBooks: (state, suggestedBooks) => {
      state.suggestedBooks = suggestedBooks;
    },
    storeImportantBooks: (state, importantBooks) => {
      state.importantBooks = importantBooks;
    },
  },
  actions: {
    fetchLanguages: async (store) => {
      const languages = await getLanguages();
      store.commit("storeLanguages", languages);
    },
    fetchLocalBooks: async (store, lang) => {
      if (lang) store.commit("storeLocalBooks", await getBooksPerLanguage(lang));
      else store.commit("storeLocalBooks", await getLocalBooks());
    },
    fetchBooks: async (store) => {
      store.commit("storeBooks", await getBooks(80));
    },
    fetchBook: async (store, id) => {
      store.commit("storeBook", await getBook(id));
    },
    fetchSuggestedBooks: async (store, id) => {
      let books_id = await getSuggestedBooks(id)
      let similarBooksId = books_id.results.suggested_books
      let similarBooks = []
      for (let i = 0; i < similarBooksId.length; i++) {
        let book = await getBook(similarBooksId[i])
        similarBooks.push(book.results)
      }
      store.commit("storeSuggestedBooks", similarBooks);
    },
    fetchImportantBooks: async (store) => {
      store.commit("storeImportantBooks", await getImportantBooks());
    },
    fetchSearch: async (store, page, limit, word) => {
      store.commit("storeBooks", await searchBooks(page, limit, word));
    },
  },
  modules: {},
  getters: {
    books: (state) => {
      return state.books;
    },
    book: (state) => {
      return state.book;
    },
    suggestedBooks: (state) => {
      return state.suggestedBooks;
    },
    importantBooks: (state) => {
      return state.importantBooks;
    },
    booksCount(state, getters) {
      return getters.books.results.length
    },
    booksAvailable(state, getters) {
      return getters.books.results.reduce(
        (acc, { id_book }) => [...acc, id_book],
        []);
    },
  }
});
export default store;
