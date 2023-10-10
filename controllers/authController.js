const User = require('../models/user');
const {validationResult } = require('express-validator');

const user_sign_up_get = async (req, res) => {
    res.render('auth/signup', {title: "sign up up "})
}

const user_sign_up_post = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const alert = errors.array();
       res.render('auth/signup', {
        alert, title: 'sign up post'
       })
    }
  }




module.exports = {
    user_sign_up_get,
    user_sign_up_post
}