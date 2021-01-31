require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error-handler')
const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const path = require('path')
connectDB()

const app = express()

app.use(express.json())
app.use(cookieParser())
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
app.use(limiter)
app.use(helmet())
app.use(mongoSanitize())

app.use('/api/v1/auth', require('./routes/auth'))
app.use('/api/v1/dashboard', require('./routes/dashboard'))

if (process.env.NODE_ENV === 'production') {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))

    app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
  }
}
// errorHandler must be in the end
app.use(errorHandler)

const PORT = Number(process.env.PORT) || 5000
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
)

process.on('SIGINT', () => {
  console.log('Bye bye!')
  process.exit()
})

process.on('unhandledRejection', (error) => {
  console.log(`Logged Error: ${error}`)
  process.exit(1)
})
