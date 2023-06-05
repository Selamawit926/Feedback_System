const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema(
  {
    comment:{
        type: String
    },
    userId:{
        type: String
    },
    title:{
      type: String
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Feedback', feedbackSchema)