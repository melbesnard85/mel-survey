import { useState } from 'react'
import { services, Post } from '../services/crud.services'
import StatementInput from '../components/StatementInput'
import SuccessCard from '../components/SuccessCard'

//survey creation page
const CreateSurvey = () => {
  const [surveyQuestions, setSurveyQuestions] = useState([])
  const [surveyTitle, setSurveyTitle] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  //function add an empty question to the ui
  function createEmptyQuestion() {
    surveyQuestions.push({ statement: '' })
    setSurveyQuestions([...surveyQuestions])
  }

  //function update a question
  function updateQuestion(newQuestion, index) {
    surveyQuestions[index].statement = newQuestion
    setSurveyQuestions(surveyQuestions)
  }

  // function creates a survey and cleans the input
  function createSurvey() {
    let data = {
      name: surveyTitle,
      questions: surveyQuestions,
    }

    Post(services.CREATE_SURVEY, data).then((result) => {
      setSurveyTitle('')
      setSurveyQuestions([])

      setIsModalOpen(true)
    })
  }

  return (
    <div
      className='min-h-screen grid content-center justify-items-center
            bg-gradient-to-r from-baby-blue/10 to-azure/10'
    >
      <SuccessCard
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
      <p className='m-4 mt-6 text-2xl font-bold'>Create your survey</p>

      <div
        className='sm:w-3/4 w-[90%] my-3 p-2 bg-sky-50 hover:bg-azure-100 inline-flex flex-col 
            items-start rounded-3xl border-2 border-baby-blue/30 hover:border-azure/30
            transition-all'
      >
        <p className='mx-2 mt-1 font-semibold text-xl'>Survey title</p>

        <div className='justify-center inline-flex flex-row w-full'>
          <input
            type='text'
            className='sm:m-4 my-4 p-4 h-13 w-[90%] rounded-xl outline-none'
            name='question-input'
            placeholder='Your surveys title'
            value={surveyTitle}
            onChange={(event) => {
              setSurveyTitle(event.target.value)
              console.log(event.target.value)
            }}
          />
        </div>
      </div>

      <div className='sm:w-3/4 w-[90%] mx-auto'>
        {surveyQuestions?.map((question, index) => (
          <StatementInput
            key={index}
            statement={question.statement}
            onChange={(event) => {
              updateQuestion(event.target.value, index)
            }}
          />
        ))}
      </div>

      <div
        onClick={createEmptyQuestion}
        className='justify-center sm:w-3/4 w-[90%] m-3 p-2 bg-sky-50 hover:bg-azure-100 inline-flex flex-row 
                    items-center rounded-3xl border-2 border-baby-blue/30 hover:border-azure/30
                    transition-all opacity-50 hover:opacity-70'
      >
        <p className=''>Add more</p>
      </div>

      <button
        onClick={createSurvey}
        className='bg-baby-blue px-10 py-4 rounded-2xl m-5 mb-10
                hover:bg-azure transition-all font-bold text-xl text-white 
                shadow-lg shadow-baby-blue/50 hover:shadow-azure/40'
      >
        Create survey
      </button>
    </div>
  )
}

export default CreateSurvey
