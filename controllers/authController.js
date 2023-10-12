const User = require("../models/user");
const { validationResult, check } = require("express-validator");
const { hashData, verifyData } = require("../utils/hashData");
const { logger } = require("../utils/logger");
const flash = require("connect-flash");

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
    logger.error("error occured", err);
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

  // check the user based on his email
  const email = req.body.email;
  const user = await User.findOne({ email });

  // check if a user does  exist
  if (user == null) {
    req.flash("error", "Invalid email or password");
    res.render("auth/login", {
      title: "login error",
      errorMessage: req.flash("error"),
    });
  }
  if (!errors.isEmpty()) {
    const alert = errors.array();
    res.render("auth/login", { title: "login", alert });
  } else {
    try {
      // req.flash("success", "login successful");
      // res.redirect("/blogs");
      const hashedPassword = user.password;
      const password = req.body.password;
      const passwordMatch = await verifyData(password, hashedPassword);

      if (!passwordMatch) {
        res.render("auth/login", {
          title: "login error",
          errorMessage: req.flash("error"),
        });
      } else {
        req.flash("success", "login sucessful");
        res.redirect("/blogs");
        console.log("successufl");
      }
    } catch (err) {
      logger.error("error occurs", err);
    }
  }
};

module.exports = {
  user_sign_up_get,
  user_sign_up_post,
  user_login_get,
  user_login_post,
};
