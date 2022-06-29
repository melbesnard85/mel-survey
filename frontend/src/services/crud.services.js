import axios from 'axios'
const ROOT_URL = 'http://localhost:8000/api'

/**
 * @LIST_SURVEYS : Endpoint for getting the survey list or a survey
 * @CREATE_SURVEY : Endpoint for survey creation
 * @SEND_SURVEY : Endpoint to submit a survey answer and get the result
 * @ANSWER_SURVEY : Endpoint for getting answers
 */
export const services = {
  LIST_SURVEYS: `${ROOT_URL}`,
  CREATE_SURVEY: `${ROOT_URL}/create`,
  SEND_SURVEY: `${ROOT_URL}/result`,
  ANSWER_SURVEY: `${ROOT_URL}/answers`,
}

/**
 * Wrapper function over axios get
 */
export const Get = (service, param) => {
  let url

  if (param) url = `${service}/${param}`
  else url = `${service}`

  return axios.get(url)
}

/**
 * Wrapper function over axios post
 */
export const Post = (service, data, param) => {
  let url

  if (param) url = `${service}/${param}`
  else url = `${service}`

  return axios.post(url, data)
}
