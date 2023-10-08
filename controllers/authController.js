
const user_sign_up_get = async (req, res) => {
    res.render('auth/signup', {title: "sign up"})
}


module.exports = {
    user_sign_up_get
}