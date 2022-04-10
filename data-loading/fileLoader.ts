// axios
import axios, { AxiosError } from 'axios'
import fs from 'fs'
const pwd = __dirname
let result = ""
const file = fs.readFileSync('./test/data.csv', 'utf-8')
let id = 0

let i = parseInt(process.argv.slice(2)[0])
console.log(`i : ${i}`);

id = parseInt(file.toString().split("\n")[i].split(";")[0])
setTimeout(async () => {
  try {
    await axios.get(`https://www.gutenberg.org/cache/epub/${id}/pg${id}.txt`)
      .then((response) => {
        result = response.data + `book ${i}\n\n\n`
        fs.writeFile(`${pwd}/test/books/${id}.txt`, result, err => {
          if (err) {
            console.error(err)
            return
          }
        })
        console.log("downloaded!");
      })
  } catch (error) {
    console.log("audiobook");
    fs.appendFile(`${pwd}/test/delete.txt`, `${id}\n`, err => {
      if (err) {
        console.error(err)
        return
      }
    });
    const err = error as AxiosError
    if (err.response) { }
  }
}, 1000)
