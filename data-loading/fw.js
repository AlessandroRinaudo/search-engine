// axios
const axios = require('axios');
const csvtojson = require('csvtojson');
const fs = require('fs')

let url = "mongodb://localhost:27017/books";


// CSV file name
const fileName = "test/data.csv";
let successCounter = 0
let failCounter = 0

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

    const fileNameRequest = `${oneRow.id}.txt`

    forward_indexing(oneRow.id, fileNameRequest)
      .then(data => {
        console.log(failCounter);
      });

    // axios.post('http://localhost:3000/api/index/forward', {
    //   id_book: oneRow.id,
    //   file: fileNameRequest
    // }).catch(function (error) {
    //   if (error.response) {
    //     failCounter++
    //     // console.log(error.response.data);
    //     // console.log(error.response.status);
    //     // console.log(error.response.headers);
    //   } else if (error.request) {
    //     console.log(error.request);
    //   } else {
    //     console.log('Error', error.message);
    //   }

    //   console.log(failCounter);
    // })



  }
});


const forward_indexing = (idFile, nameFile) => {
  return axios.post('http://localhost:3000/api/index/forward', {
    id_book: idFile,
    file: nameFile
  }).catch(function (error) {
    if (error.response) {
      failCounter++
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }

    // console.log(failCounter);
  })
}