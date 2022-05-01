const axios = require('axios');



const sendGetRequest = async (val) => {
  try {
    const resp = await axios.get(`http://localhost:3000/api/index/forward/${val}`);
    return resp.data.results[0].words
  } catch (err) {
    console.error(err);
  }
};

const forwardResponse = async () => {
  try {
    const resp = await axios.get(`http://localhost:3000/api/index/forward/`);
    // console.log(resp.data.results);
    return resp.data.results
  } catch (err) {
    console.error(err);
  }
};

const toDatabase = async (id_book, suggested_books) => {
  try {
    const resp = await axios.post(`http://localhost:3000/api/index/suggested`, {
      id_book: id_book,
      suggested_books: suggested_books
    });
    return resp
  } catch (err) {
    console.error(err);
  }
};


const jaccardAPI = async (val1, val2) => {

  const wordsRes1 = await sendGetRequest(val1)
  const wordsRes2 = await sendGetRequest(val2)

  const foundIndex = (arr, name) => {
    const found = arr.find(element => element.name == name)
    return arr.indexOf(found)
  }


  const jaccardFunction = (arr1, arr2) => {
    let res = 0
    let scoreTot = 0
    arr1.forEach((valueArr1) => {
      let condition = foundIndex(arr2, valueArr1.name)
      if (condition !== -1) {
        res += Math.abs((valueArr1.score - arr2[condition].score))
      }
      else
        res += valueArr1.score
    });


    arr1.forEach((valueArr1) => {
      scoreTot += valueArr1.score
    });
    arr2.forEach((valueArr2) => {
      scoreTot += valueArr2.score
    });


    return res / scoreTot

  }

  return jaccardFunction(wordsRes1, wordsRes2)


}

const res = (async () => {
  let finalRes = []
  let suggestions = []
  const iterStep0 = await forwardResponse()
  let iter = []
  iterStep0.forEach((it) => {
    iter.push(it.id_book)
  })
  // console.log(iter);

  for (let i = 1; i < 3; i++) {
    let initArr = [...iter]
    initArr.splice(i, 1)
    // console.log(initArr);
    suggestions = []
    for (let j = 0; j < initArr.length; j++) {
      let jaccardDistance = await jaccardAPI(iter[i], initArr[j])
      if (suggestions.length > 6)
        break
      if (jaccardDistance <= 0.4 && suggestions.length < 6)
        suggestions.push(initArr[j])
      // console.log(`distance entre ${iter[i]} et ${initArr[j]} : `, jaccardDistance);
    }
    finalRes.push({
      id: iter[i],
      suggestedBooks: suggestions
    })
    await toDatabase(iter[i], suggestions)
  }
  console.log(finalRes);

})()

