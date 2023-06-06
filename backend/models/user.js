const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
    },
    active: {
          type: Boolean
    },
    role:{
        type: String
    },
    otp:{
      code:{
        type: String
      },
      expiresAt:{
        type: Date 
      }
        
    },
    verified:{
        type:Boolean
    },

  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)