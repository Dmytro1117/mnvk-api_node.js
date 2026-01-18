const { BadRequest } = require("http-errors");

const validateJoyWrapper = (joiSchema, property = "body") => {
  const func = (req, res, next) => {
    const { error } = joiSchema.validate(req[property], {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      console.log(`Joi Validation Error [${property}]:`, error.details);
      const errors = error.details.map((err) => err.message);
      return next(new BadRequest(errors));
    }

    next();
  };

  return func;
};

module.exports = validateJoyWrapper;
