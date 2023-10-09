
const user_sign_up_get = async (req, res) => {
    res.render('auth/signup', {title: "sign up"})
}


// const user_sign_up_post = async (req, res) => {

// }

module.exports = {
    user_sign_up_get
}