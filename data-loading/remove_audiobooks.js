// axios
const csvtojson = require('csvtojson');
const fs = require('fs')


// CSV file name
let fileNameDelete = "test/delete.txt";
let fileName = "test/data.csv";
let idsToDelete = []
let arrayToInsert = []
let result = "id,title,authorName,authorLastName,languages,download_count,copyright,subjects,bookshelves\n"


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
        download_count: source[i]["download_count"],
        copyright: source[i]["copyright"],
        subjects: source[i]["subjects"],
        bookshelves: source[i]["bookshelves"]
      };
      // arrayToInsert.push(oneRow);
      
      let language = ''
      if (oneRow.languages.length > 1) {
        for (let i = 0; i < oneRow.languages.length; i++) {
          language += oneRow.languages[i] += ';'
        }
      }
      else language = oneRow.languages[0]

      oneRow.title = oneRow.title.replaceAll(',', ';')
      oneRow.authorName.replaceAll(',', '')
      oneRow.authorLastName.replaceAll(',', '')

      let subject = ''
      if (oneRow.subjects.length > 1) {
        for (let i = 0; i < oneRow.subjects.length; i++) {
          subject += oneRow.subjects[i] += ''
        }
      }
      else subject = oneRow.subjects[0]

      subject = subject.replaceAll(',', ';')

      let bookshelv = ''
      if (oneRow.bookshelves.length > 1) {
        for (let i = 0; i < oneRow.bookshelves.length; i++) {
          bookshelv += oneRow.bookshelves[i] += ''
        }
      }
      else bookshelv = "Aucune"

      bookshelv = bookshelv.replaceAll(',', ';')
      arrayToInsert.push({
        id:  oneRow.id,
        title:  oneRow.title,
        authorName:  oneRow.authorName,
        authorLastName: oneRow.authorLastName,
        languages:  language,
        download_count: oneRow.download_count,
        copyright: oneRow.copyright,
        subject: subject,
        bookshelv: bookshelv
        
      });
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
    for (let i in arrayToInsert) {
      result += `${arrayToInsert[i].id},${arrayToInsert[i].title},${arrayToInsert[i].authorName},${arrayToInsert[i].authorLastName},${arrayToInsert[i].language},${arrayToInsert[i].download_count},${arrayToInsert[i].copyright},${arrayToInsert[i].subject},${arrayToInsert[i].bookshelv},\n`
    }
    fs.writeFile(fileName, result, err => {
      if (err) {
        console.error(err)
        return
      }
    })

  });

});
