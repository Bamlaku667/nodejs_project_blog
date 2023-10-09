const User = require('../models/user')
const user_sign_up_get = async (req, res) => {
    res.render('auth/signup', {title: "sign up"})
}

const user_sign_up_post = async (req, res) => {
    const user = req.body 
    try {
        console.log(user);
        res.send(user);
    }
    catch(err) {
        console.log(err);
    }
}


module.exports = {
    user_sign_up_get,
    user_sign_up_post
}