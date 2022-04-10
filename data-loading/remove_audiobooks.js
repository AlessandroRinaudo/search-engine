// axios
const csvtojson = require('csvtojson');
const fs = require('fs')


// CSV file name
let fileNameDelete = "test/delete.txt";
let fileName = "test/data.csv";
let idsToDelete = []
let arrayToInsert = []
let result = "id,title,authorName,authorLastName,languages,download_count,\n"


fs.readFile(fileNameDelete, function (err, data) {
  if (err) throw err;

  idsToDelete = data.toString().replace(/\r\n/g, '\n').split('\n');

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
      arrayToInsert.push(oneRow);
    }

    console.log(arrayToInsert.length);


    // write here 
    let tmp = []
    for (let j = 0; j < idsToDelete.length; j++) {
      for (let i = 0; i < arrayToInsert.length; i++) {

        if (arrayToInsert[i].id !== idsToDelete[j])
          tmp.push(arrayToInsert[i])
      }
      arrayToInsert = tmp
      tmp = []
    }

    console.log(arrayToInsert.length);
    for(let i in arrayToInsert) {
      result += `${arrayToInsert[i].id},${arrayToInsert[i].title},${arrayToInsert[i].authorName},${arrayToInsert[i].authorLastName},${arrayToInsert[i].language},${arrayToInsert[i].download_count},\n`
    }
    fs.writeFile(fileName, result, err => {
      if (err) {
        console.error(err)
        return
      }
    })

  });

});
