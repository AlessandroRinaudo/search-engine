// axios
import axios, { AxiosError } from 'axios'
import fs from 'fs'
const pwd = __dirname
let result = "id,title,authorName,authorLastName,languages,download_count,\n"

const url = "mongodb://localhost:27017/";
for (let i = 1; i < 20; i++) {
  setTimeout(async () => {
    try {
      await axios.get(`http://gutendex.com/books/?page=${i}`)
        .then((response) => {
          const pageLength = response.data.results.length
          for (let j = 0; j < pageLength; j++) {
            let {
              id,
              title,
              authors,
              translators,
              subjects,
              bookshelves,
              languages,
              copyright,
              download_count } = response.data.results[j]

            const auth = authors[0].name.split(",");
            const authorName = auth[1]
            const authorLastName = auth[0]

            let language = ''
            if (languages.length > 1) {
              for (let i = 0; i < languages.length; i++) {
                language += languages[i] += ';'
              }
            }
            else language = languages[0]

            title= title.replaceAll(',', ';')
            authorName.replaceAll(',', ' ')
            authorLastName.replaceAll(',', ' ')

            result += `${id},${title},${authorName},${authorLastName},${language},${download_count},\n`
            fs.writeFile(`${pwd}/test/data.csv`, result, err => {
              if (err) {
                console.error(err)
                return
              }
            })
          }
        })
    } catch (error) {
      const err = error as AxiosError
      if (err.response) {
        i--
      }
    }
  }, 1000)
}

