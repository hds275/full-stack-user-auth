const User = require('../models/user')
const ErrorResponse = require('../utils/error-response')

exports.signUp = async (req, res, next) => {
  const { username, email, password, firstName, lastName } = req.body
  try {
    const user = await User.create({
      username,
      email,
      password,
      firstName,
      lastName
    })
    signInUser(user, 201, res)
  } catch (error) {
    next(error)
  }
}

exports.signIn = async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return next(new ErrorResponse('Provide email and password'))
  }

  try {
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401))
    }

    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401))
    }
    signInUser(user, 200, res)
  } catch (error) {
    next(error)
  }
}

exports.signOut = async (req, res, next) => {
  res.clearCookie('auth-token')
  res.clearCookie('is-signed-in')
  res.status(200).json({ successful: true })
}

exports.isSignedIn = async (req, res, next) => {
  res.status(200).json({ successful: true })
}

const signInUser = (user, statusCode, res) => {
  const token = user.getSignedToken()
  res.cookie('auth-token', token, { maxAge: 900000, httpOnly: true })
  res.cookie('is-signed-in', true, { maxAge: 900000 })
  res.status(statusCode).json({ successful: true })
}
