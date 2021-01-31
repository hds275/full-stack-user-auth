const { protect } = require('../middleware/auth')
const express = require('express')
const router = express.Router()

const { signUp, signIn, signOut, isSignedIn } = require('../controllers/auth')

router.route('/signUp').post(signUp)
router.route('/signIn').post(signIn)
router.route('/signOut').get(signOut)
router.route('/isSignedIn').get(protect, isSignedIn)
module.exports = router
