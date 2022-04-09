import data from "./database.json";

const getLocalBooks = async () =>
  Object.values(data).reduce((acc, val) => acc.concat(val), []);

const getBooks = async (page) => {
  return await fetch(`${import.meta.env.VITE_GUTENDEX_URL}/book?page=${page}`)
    .then((response) => response.json())
    .catch(error => {
      console.log("ERROR getBooks: ", error);
    });
}

const getBook = async (id) => {
  return await fetch(`${import.meta.env.VITE_GUTENDEX_URL}/book/${id}`)
    .then((response) => response.json())
    .catch(error => {
      console.log("ERROR getBook: ", error);
    });
}

const searchBooks = async ({ page, word }) => {
  return await fetch(`${import.meta.env.VITE_GUTENDEX_URL}/search?q=${word}&page=${page}`)
    .then((response) => response.json())
    .catch(error => {
      console.log("ERROR searchBooks: ", error);
    });
}
const getBooksPerLanguage = async (language) => data[language];

const getLanguages = async () => Object.keys(data);

export { getBook, getBooks, searchBooks, getLocalBooks, getBooksPerLanguage, getLanguages };
