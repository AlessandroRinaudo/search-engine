import data from "./database.json";

const getLocalBooks = async () =>
  Object.values(data).reduce((acc, val) => acc.concat(val), []);

const getBooks = async (limit) => {
  return await fetch(`${import.meta.env.VITE_GUTENDEX_URL}/book/?sort=download_count&dir=desc&limit=${limit}`)
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

const getSuggestedBooks = async (id) => {
  // return [74, 1184, 3600, 161, 140, 20228, 1254, 100]

  return await fetch(`${import.meta.env.VITE_GUTENDEX_URL}/index/suggested/${id}`)
    .then((response) => response.json())
    .catch(error => {
      console.log("ERROR getSuggestedBooks: ", error);
    });
}

const getImportantBooks = async () => {
  return await fetch(`${import.meta.env.VITE_GUTENDEX_URL}/index/closeness`)
    .then((response) => response.json())
    .catch(error => {
      console.log("ERROR getImportantBooks: ", error);
    });
}

const searchBooks = async ({ page, limit, word }) => {
  if (limit) {
    return await fetch(`${import.meta.env.VITE_GUTENDEX_URL}/search?q=${word}&limit=${limit}&page=${page}`)
      .then((response) => response.json())
      .catch(error => {
        console.log("ERROR searchBooks: ", error);
      });
  }
  else {
    return await fetch(`${import.meta.env.VITE_GUTENDEX_URL}/search?q=${word}&limit=40&page=${page}`)
      .then((response) => response.json())
      .catch(error => {
        console.log("ERROR searchBooks: ", error);
      });
  }

}
const getBooksPerLanguage = async (language) => data[language];

const getLanguages = async () => Object.keys(data);

export { getBook, getBooks, getSuggestedBooks, getImportantBooks, searchBooks, getLocalBooks, getBooksPerLanguage, getLanguages };
