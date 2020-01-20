const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
  qText: {
    type: String,
    trim: true
  },
  asset: {
    type: String,
    trim: true
  },
  variants: [{
    type: String,
    trim: true
  }],
  correct: {
    type: String,
    trim: true
  },
  decision: {
    type: String,
    trim: true
  },
  decisionText: {
    type: String,
    trim: true
  }
})


module.exports = mongoose.model('Question', QuestionSchema)