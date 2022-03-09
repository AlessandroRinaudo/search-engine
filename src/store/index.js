import { createStore } from "vuex";
import { getLanguages, getBooksPerLanguage, getBooks, getTotalBooks, getBook } from "../service/books";

const store = createStore({
  state: {
    languages: [],
    books: [],
    totalBooks: [],
    book: {},
  },
  mutations: {
    storeLanguages: (state, languages) => {
      state.languages = languages;
    },
    storeBooks: (state, books) => {
      state.books = books;
    },
    storeTotalBooks: (state, totalBooks) => {
      state.totalBooks = totalBooks;
    },
    storeBook: (state, book) => {
      state.book = book;
    }
  },
  actions: {
    fetchLanguages: async (store) => {
      const languages = await getLanguages();
      store.commit("storeLanguages", languages);
    },
    fetchBooks: async (store, lang) => {
      if (lang) store.commit("storeBooks", await getBooksPerLanguage(lang));
      else store.commit("storeBooks", await getBooks());
    },
    fetchTotalBooks: async (store, id) => {
      store.commit("storeTotalBooks", await getTotalBooks(id));
    },
    fetchBook: async (store, id) => {
      store.commit("storeBook", await getBook(id));
    }
  },
  modules: {},
  getters: {}
});
export default store;
