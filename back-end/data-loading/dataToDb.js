const csvtojson = require('csvtojson');
const mongodb = require('mongodb');

let url = "mongodb://localhost:27017/books";

let dbConn;
mongodb.MongoClient.connect(url, {
  useUnifiedTopology: true,
}).then((client) => {
  console.log('DB Connected!');
  dbConn = client.db();
}).catch(err => {
  console.log(`DB Connection Error: ${ err.message }`);
});

// CSV file name
const fileName = "test/data.csv";
var arrayToInsert = [];
csvtojson().fromFile(fileName).then(source => {
    // Fetching the all data from each row
    for (var i = 0; i < source.length; i++) {
         var oneRow = {
             id:source[i]["id"],
             title:source[i]["title"],
             authorName:source[i]["authorName"],
             authorLastName:source[i]["authorLastName"],
             languages:source[i]["languages"],
             download_count:source[i]["download_count"]
         };
         arrayToInsert.push(oneRow);
     }
     //inserting into the table "employees"
     var collection = dbConn.collection('books');
     console.log(collection);
     collection.insertMany(arrayToInsert, (err, result) => {
         if (err) console.log(err);
         if(result){
             console.log("Import data successfully.");
              // res.status(200).send('Ok');
         }
     });
});