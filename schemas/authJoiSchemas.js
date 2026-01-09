const Joi = require("joi");
const { emailRegexp } = require("../constants/constant");

const registerJoiSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "enter name (must be exist)",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "enter email (must be exist)",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "enter password (must be exist)",
  }),
});

const verifyJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "send email",
  }),
});

const loginJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "enter mail",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "enter password",
  }),
});

module.exports = {
  registerJoiSchema,
  verifyJoiSchema,
  loginJoiSchema,
};
