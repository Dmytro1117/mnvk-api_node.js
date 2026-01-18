const Joi = require("joi");

const addProfessionJoiSchema = Joi.object({
  title: Joi.string().min(3).max(50).required().messages({
    "any.required": "Назва професії обов'язкова",
  }),

  category: Joi.string()
    .valid("driver", "cook", "secretary", "locksmith", "web", "psychologist")
    .required(),
  poster: Joi.string(),
  about: Joi.object({
    text: Joi.string().min(10).required(),
    image: Joi.string(),
  }).required(),
  lectures: Joi.array().items(
    Joi.object({
      lectureTitle: Joi.string().required(),
      content: Joi.string().min(20).required(),
    }),
  ),
  gallery: Joi.array().items(
    Joi.object({
      url: Joi.string().uri().required(),
      public_id: Joi.string().required(),
    }),
  ),
});

const addLectureJoiSchema = Joi.object({
  lectureTitle: Joi.string().min(3).max(100).required().messages({
    "any.required": "Заголовок лекції обов'язковий",
  }),
  content: Joi.string().min(20).required().messages({
    "string.min": "Текст лекції має бути не менше 20 символів",
    "any.required": "Вміст лекції обов'язковий",
  }),
});

const deleteLectureJoiSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Некоректний формат ID професії",
    }),
  lectureId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Некоректний формат ID лекції",
    }),
});

const deletePhotoJoiSchema = Joi.object({
  photoId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Некоректний формат ID фотографії",
    }),
});

module.exports = {
  addProfessionJoiSchema,
  addLectureJoiSchema,
  deletePhotoJoiSchema,
  deleteLectureJoiSchema,
};
