import data from "./database.json";

const getBooks = async () =>
  Object.values(data).reduce((acc, val) => acc.concat(val), []);

const getTotalBooks = async () => {
  return await fetch(`${import.meta.env.VITE_GUTENDEX_URL}/books`)
    .then((response) => response.json())
    .catch(error => {
      console.log("ERROR getTotalBooks: ", error);
    });
}

const getBook = async (id) => {
  return await fetch(`${import.meta.env.VITE_GUTENDEX_URL}/books/${id}`)
    .then((response) => response.json())
    .catch(error => {
      console.log("ERROR getBook: ", error);
    });
}

const getBooksPerLanguage = async (language) => data[language];

const getLanguages = async () => Object.keys(data);

export { getBook, getTotalBooks, getBooks, getBooksPerLanguage, getLanguages };
