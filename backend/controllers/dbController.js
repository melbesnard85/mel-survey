const fs = require('fs')
const mz = require('mz/fs')

const surveysData = './data/surveys.json'

const answersData = './data/surveyAnswers.json'

// function to check if the files exist
module.exports.checkDB = () => {
  let emptyArr = []

  fs.access(surveysData, (err) => {
    if (err) {
      fs.appendFile(
        surveysData,
        JSON.stringify(emptyArr),
        (fileError, result) => {}
      )
    }
  })

  fs.access(answersData, (err) => {
    if (err) {
      fs.appendFile(
        answersData,
        JSON.stringify(emptyArr),
        (fileError, result) => {}
      )
    }
  })
}

//function that appends new data to the surveys json database
module.exports.appendDB = async (key, data) => {
  let path = getPath(key)

  try {
    let fsData = await mz.readFile(path)
    let dbData = JSON.parse(fsData)
    data.id = dbData.length + 1
    dbData.push(data)

    let strData = JSON.stringify(dbData)
    fs.writeFile(path, strData, (err, result) => {})
    return data
  } catch (err) {
    console.log(err)
  }
}

//returns the whole surveys json file data
module.exports.readDB = async (key) => {
  let path = getPath(key)

  const data = await mz.readFile(path)
  let strData = JSON.parse(data)
  return strData
}

//returns a string of the path that corresponds to the key
const getPath = (key) => {
  if (key === 'KEY_SURVEY') {
    return surveysData
  } else {
    return answersData
  }
}
