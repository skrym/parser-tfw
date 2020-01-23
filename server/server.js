const mongoose = require('mongoose')
const express = require('express')
const Question = require('./question')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const URI = process.env.URI || ''

const connectS = async () => {
  const conn = await mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  console.log(`MongoDB Connected: ${conn.connection.host}`)
  const server = app.listen(5050, console.log(`Server running on port 5050`))
}
connectS()

app.post('/q', async (req, res) => {
  let q = await Question.insertMany(req.body)
  res.json({
    success: true,
    data: q
  })
})