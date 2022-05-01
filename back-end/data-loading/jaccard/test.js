const example1 = [
  {
    "score": 91,
    "_id": "6253e47d4c69c838440d81b0",
    "name": "project"
  },
  {
    "score": 100,
    "_id": "6253e47d4c69c838440d81b1",
    "name": "gutenberg"
  },
  {
    "score": 14,
    "_id": "6253e47d4c69c838440d81b2",
    "name": "ebook"
  },
  {
    "score": 8,
    "_id": "6253e47d4c69c838440d81b3",
    "name": "moby"
  },
  {
    "score": 15,
    "_id": "6253e47d4c69c838440d81b4",
    "name": "language"
  },
  {
    "score": 3,
    "_id": "6253e47d4c69c838440d81b5",
    "name": "grady"
  },
]


const example2 = [
  {
    "score": 33,
    "_id": "6253e47d4c69c838440d81b1",
    "name": "gutenbergo"
  },
  {
    "score": 12,
    "_id": "6253e47d4c69c838440d81b0",
    "name": "project"
  },
  {
    "score": 9,
    "_id": "6253e47d4c69c838440d81b5",
    "name": "diff"
  },
  {
    "score": 140,
    "_id": "6253e47d4c69c838440d81b2",
    "name": "ebook"
  },
  {
    "score": 86,
    "_id": "6253e47d4c69c838440d81b3",
    "name": "moby"
  },
  {
    "score": 11,
    "_id": "6253e47d4c69c838440d81b4",
    "name": "language"
  },
]


// console.log(foundIndex(arr1, "languagedf"));

const foundIndex = (arr, name) => {
  const found = arr.find(element => element.name == name)
  return arr.indexOf(found)
}


const jaccardFunction = (arr1,arr2) => {
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


  return res/scoreTot

}

console.log(jaccardFunction(example1,example2)); 