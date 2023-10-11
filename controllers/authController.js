const User = require("../models/user");
const { validationResult } = require("express-validator");
const { hashData } = require("../utils/hashData");
const user_sign_up_get = async (req, res) => {
  res.render("auth/signup", { title: "sign up up " });
};

const user_sign_up_post = async (req, res) => {
  try {
    // check for validation errors
    const errors = validationResult(req);

    // check for the existing email
    const email = req.body.email;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      errors.errors.push({
        value: email,
        msg: "Email is already in use",
        location: "body",
      });
    }

    if (!errors.isEmpty()) {
      const alert = errors.array();
      res.render("auth/signup", {
        alert,
        title: "sign up post",
      });
    } else {
      const password = req.body.password;
      const hashedPassword = await hashData(password);
      const newUser = new User({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email,
        token: "",
      });

      await newUser
        .save()
        .then((result) => {
          res.redirect("signup");
        })
        .catch((err) => console.log(err));
    }
  } catch (err) {
    throw err;
  }
};

module.exports = {
  user_sign_up_get,
  user_sign_up_post,
};
