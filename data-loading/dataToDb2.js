// axios
const axios = require('axios');
const csvtojson = require('csvtojson');
const fs = require('fs')

let url = "mongodb://localhost:27017/books";


// CSV file name
const fileName = "test/data.csv";
csvtojson().fromFile(fileName).then(source => {
  // Fetching the all data from each row
  for (let i = 0; i < source.length; i++) {
    let oneRow = {
      id: source[i]["id"],
      title: source[i]["title"],
      authorName: source[i]["authorName"],
      authorLastName: source[i]["authorLastName"],
      languages: source[i]["languages"],
      download_count: source[i]["download_count"]
    };

    const fileName = `${oneRow.id}.txt`

    axios.post('http://localhost:3000/api/index/forward', {
      id_book: oneRow.id,
      file: fileName
    })

    axios.post('http://localhost:3000/api/book/insert', {
      id: oneRow.id,
      title: oneRow.title,
      authors: { name: oneRow.authorName + " " + oneRow.authorLastName, birth_year: "1997" },
      translators: "[]",
      subjects: "la tu mammdzefa",
      bookshelves: "lol",
      languages: oneRow.languages,
      copyright: "false",
      mediatype: "dcvf",
      download_count: oneRow.download_count
    })
      .then(function (response) {
        console.log(response);
      })

  }
});