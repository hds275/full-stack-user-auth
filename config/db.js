const mongoose = require('mongoose')

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true
  })
  console.log('MongoDB connected successfully')
}

module.exports = connectDB
