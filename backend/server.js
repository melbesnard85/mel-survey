const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.port || 8000

const surveyRoutes = require('./routes/surveyRoutes')

app.use(express.json())
app.use(cors())

app.use('/', surveyRoutes)

app.listen(port, () => {
  console.log(`Server started on port ${port} 🚀`)
})
