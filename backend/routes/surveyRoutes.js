const express = require('express')
const router = express.Router()
const { readDB, appendDB } = require('../controllers/dbController')
const {
  validateSurvey,
  validateAnswer,
} = require('../middleware/InputValidation')

/**
 * get the list of stored surveys without the answers
 */
router.get('/', async (req, res) => {
  const surveyList = await readDB('KEY_SURVEY')
  res.send(surveyList)
})

/**
 * get a survey by its id without answers
 */
router.get('/:id', async (req, res) => {
  const idSurvey = parseInt(req.params.id)
  const surveyList = await readDB('KEY_SURVEY')
  const survey = surveyList.find((survey) => survey.id === idSurvey)

  if (!survey)
    return res.status(404).send('A survey with such id does not exist')

  res.send(survey)
})

// get answers of taken survey
router.get('/answers/:id', async (req, res) => {
  const idAnswer = parseInt(req.params.id)
  const answerList = await readDB('KEY_SURVEY_ANSWER')
  const answers = answerList.filter((answer) => answer.idSurvey === idAnswer)

  if (!answers)
    return res.status(404).send('answers with such id does not exist')

  return res.send(answers)
})

/**
 * get the result of a survey
 * @param: req contains the response of the user on a survey
 */
router.post('/result/:id', async (req, res) => {
  const idSurvey = parseInt(req.params.id)
  const surveyList = await readDB('KEY_SURVEY')
  const survey = surveyList.find((survey) => survey.id === idSurvey)

  if (!survey)
    return res
      .status(404)
      .send('Your answer does not seem to have an existing valid survey')

  const { error, value } = validateAnswer(req.body)
  if (error) {
    console.log(error.details[0].message)
    return res.status(400).send(error.details[0].message)
  }

  if (idSurvey != value.idSurvey) {
    return res
      .status(400)
      .send('Your answer does not seem to have an existing valid survey')
  }

  appendDB('KEY_SURVEY_ANSWER', value).then(async (resValue) => {
    let surveyResponses = await readDB('KEY_SURVEY_ANSWER')

    let result = surveyResponses?.filter(
      (surveyResponse) => surveyResponse.idSurvey === idSurvey
    )

    return res.send(result)
  })
})

/**
 * create a survey
 * @param: req contains the survey object to store
 */
router.post('/create', async (req, res) => {
  const { error, value } = validateSurvey(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  let newSurvey = await appendDB('KEY_SURVEY', value)
  res.send(newSurvey)
})

module.exports = router
