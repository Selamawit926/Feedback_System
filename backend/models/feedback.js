const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema(
  {
    comment:{
        type: String
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Feedback', feedbackSchema)