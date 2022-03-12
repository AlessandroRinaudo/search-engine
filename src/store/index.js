import { createStore } from "vuex";
import { getLanguages, getBooksPerLanguage, getLocalBooks, getBooks, getBook } from "../service/books";

const store = createStore({
  state: {
    languages: [],
    localBooks: [],
    books: [],
    book: {},
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
    }
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
    fetchBooks: async (store, page) => {
      store.commit("storeBooks", await getBooks(page));
    },
    fetchBook: async (store, id) => {
      store.commit("storeBook", await getBook(id));
    }
  },
  modules: {},
  getters: {}
});
export default store;
