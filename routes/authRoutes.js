const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const authController = require('../controllers/authController')
const validateUserInputs = require('../utils/validation');

router.get("/signup", authController.user_sign_up_get);
// router.get('/signup', authController.user_sign_up_post)

router.post(
  "/signup",
  validateUserInputs,
  authController.user_sign_up_post
  
);

module.exports = router;
