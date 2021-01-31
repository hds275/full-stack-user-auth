const ErrorResponse = require('../utils/error-response')

const MONGODB_ERROR_CODE_DUPLICATE_ENTIRES = 11000
const errorHandler = (err, req, res, next) => {
  let error = { ...err }

  error.message = err.message

  if (err.code === MONGODB_ERROR_CODE_DUPLICATE_ENTIRES) {
    const key = Object.keys(err.keyValue)[0]
    const message = `${key} already exits`
    error = new ErrorResponse(message, 400)
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((value) => value.message)
    error = new ErrorResponse(message, 400)
  }

  res.status(error.statusCode || 500).json({
    successful: false,
    error: error.message || 'Server Error'
  })
}

module.exports = errorHandler
