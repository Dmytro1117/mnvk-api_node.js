const Joi = require("joi");
const { emailRegexp } = require("../constants/constant");

const registerJoiSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Поле 'Ім'я' є обов'язковим",
    "string.empty": "Ім'я не може бути порожнім",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "Поле 'Email' є обов'язковим",
    "string.pattern.base": "Невірний формат електронної пошти",
    "string.empty": "Email не може бути порожнім",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Поле 'Пароль' є обов'язковим",
    "string.min": "Пароль має містити не менше 6 символів",
    "string.empty": "Пароль не може бути порожнім",
  }),
});

const verifyJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "Введіть email",
    "string.empty": "Email не може бути порожнім",
    "string.pattern.base": "Некоректний формат email",
  }),
});

const loginJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "Введіть email",
    "string.empty": "Email не може бути порожнім",
    "string.pattern.base": "Некоректний формат email",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Введіть пароль",
    "string.empty": "Пароль не може бути порожнім",
    "string.min": "Пароль має бути не менше 6 символів",
  }),
});

module.exports = {
  registerJoiSchema,
  verifyJoiSchema,
  loginJoiSchema,
};
