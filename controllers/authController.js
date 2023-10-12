const User = require("../models/user");
const { validationResult, check } = require("express-validator");
const { hashData } = require("../utils/hashData");
const { emailValidation, passwordValidation } = require("../utils/validation");
const validateUserInputs = require("../utils/validation");
const { logger } = require("../utils/logger");

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
        title: "sign up",
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

const user_login_get = async (req, res) => {
  res.render("auth/login", { title: "login login" });
};

const user_login_post = async (req, res) => {
  validateLogin = [
    check("email").trim().isEmail().withMessage("Invalid email adress"),
    check("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("password must be 8 characters long"),
  ];

  await Promise.all(validateLogin.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  const email = req.body.email;
  const user = await User.findOne({ email });

  // check if a user does  exist
  if (user == null) {
    errors.errors.push({
      value: req.body.email,
      msg: "invalid credentials",
      location: "body",
    });
  }

  // check for any potential errors in the filling form
  if (!errors.isEmpty()) {
    const alert = errors.array();
    console.log("error occurs");
    // res.json(alert);
    res.render("auth/login", { title: "login", alert });
  } else {
    try {
      console.log(user.email);
    } catch (err) {
      throw err;
    }
  }
};

module.exports = {
  user_sign_up_get,
  user_sign_up_post,
  user_login_get,
  user_login_post,
};
