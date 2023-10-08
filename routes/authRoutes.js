const express = require('express');
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/signup', authController.user_sign_up_get);
// router.get('/signup', authController.user_sign_up_post)








module.exports = router