const axios = require('axios');



const sendGetRequest = async (val) => {
  try {
    const resp = await axios.get(`http://localhost:3000/api/index/forward/${val}`);
    return resp.data.results[0].words
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

  // console.log(jaccardFunction(wordsRes1, wordsRes2));
  return jaccardFunction(wordsRes1, wordsRes2)


}

const res = (async () => {
  const iter = [3206, 61, 851, 37134, 25717, 67562]

  // let initArr = [...iter]
  // initArr.splice(2, 1)
  // console.log(initArr);

  for (let i = 0; i < iter.length; i++) {
    let initArr = [...iter]
    initArr.splice(i, 1)
    console.log(initArr);
    // console.log(`i ${i} :`, initArr);
    for (let j = 0; j < initArr.length; j++)
      console.log(`distance entre ${iter[i]} et ${initArr[j]} : `,await jaccardAPI(iter[i], initArr[j]));
    }
  }) ()

