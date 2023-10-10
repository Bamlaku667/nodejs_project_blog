const { body, check } = require("express-validator");

const validateUserInputs = [
  check("name").trim().isEmpty().withMessage("name is required"),
  check("email").trim().isEmail().withMessage("Invalid email adress"),
  check("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("password must be 8 characters long"),
];

module.exports = validateUserInputs;
