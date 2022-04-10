import data from "./database.json";

const getLocalBooks = async () =>
  Object.values(data).reduce((acc, val) => acc.concat(val), []);

const getBooks = async (limit) => {
  return await fetch(`${import.meta.env.VITE_GUTENDEX_URL}/book/?sort=-download_count&limit=${limit
    }`)
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

const searchBooks = async ({ page, limit, word }) => {
  return await fetch(`${import.meta.env.VITE_GUTENDEX_URL}/search?q=${word}&limit=${limit
    }&page=${page}`)
    .then((response) => response.json())
    .catch(error => {
      console.log("ERROR searchBooks: ", error);
    });
}
const getBooksPerLanguage = async (language) => data[language];

const getLanguages = async () => Object.keys(data);

export { getBook, getBooks, searchBooks, getLocalBooks, getBooksPerLanguage, getLanguages };
