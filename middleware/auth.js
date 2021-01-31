const jwt = require('jsonwebtoken')
const User = require('../models/user')
const ErrorResponse = require('../utils/error-response')

exports.protect = async (req, res, next) => {
  const authToken = req.cookies['auth-token']

  if (!authToken) {
    return next(new ErrorResponse('Not authorized to access this route', 401))
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id)

    if (!user) {
      return next(new ErrorResponse('No user found with this id', 404))
    }

    req.user = user
    next()
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401))
  }
}
