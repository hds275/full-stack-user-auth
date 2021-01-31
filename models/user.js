const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'email address is required',
    validate: {
      validator: async function(email) {
        const user = await this.constructor.findOne({ email });
        if(user) {
          return this.id === user.id;

        }
        return true;
      },
      message: props => `Email ${props.value} is already in use.`
    },
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ],
    maxLength: [50, 'email must be less than 50 characters']
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    match: [/^[a-zA-Z0-9]+$/, 'username must only contain letters and numbers'],
    validate: {
      validator: async function(username) {
        const user = await this.constructor.findOne({ username });
        if(user) {
          return this.id === user.id;

        }
        return true;
      },
      message: props => `Username ${props.value} is already in use.`
    },
    required: 'username is required',
    maxLength: [50, 'username must be less than 50 characters'],
    minLength: [4, 'username must be more than 5 characters']
  },

  firstName: {
    type: String,
    required: 'firstName is required',
    trim: true,
    match: [/^[a-zA-Z ]+$/, 'firstName must only contain letters'],
    maxLength: [50, 'firstName must be less than 50 characters']
  },
  lastName: {
    type: String,
    required: 'secondName is required',
    trim: true,
    match: [/^[a-zA-Z ]+$/, 'lastName must only contain letters'],
    maxLength: [50, 'secondName must be less than 50 characters']
  },

  createdAt: {
    type: Date,
    default: new Date()
  },

  password: {
    type: String,
    required: 'password is required',
    minLength: [6, 'password must be more than 6 characters'],
    maxLength: [128, 'password must be less than 128 characters'],
    select: false
  }
})

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})


UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

const User = mongoose.model('User', UserSchema)

module.exports = User
