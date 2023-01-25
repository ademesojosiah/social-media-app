const router = require('express').Router()
const authController = require('../controllers/authController')
const {userValidationMiddleware} = require('../validation/userValidation')
require('../utils/passportOAuth')
const passport = require('passport')

router.post('/signup', userValidationMiddleware, authController.signup)
router.post('/login', authController.login)

//GOOGLE OAUTH
router.get('/auth/google', passport.authenticate('google', {scope: ['profile']}))

//GITHUB OAUTH
router.get('/auth/github', passport.authenticate('github', {scope: ['user:email']}))

//OAUTH CALLBACK
router.get('/auth/callback', passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
    console.log('Here now!');
    return res.redirect('/protected')
})

router.get('/auth/github/callback', passport.authenticate('github', {failureRedirect: '/'}), (req, res) => {
    console.log('Here now!');
    return res.redirect('/protected')
})


module.exports = router