const { BadRequest } = require("http-errors");

const validateJoyWrapper = (joiSchema) => {
  const func = (req, res, next) => {
    const { error } = joiSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      throw new BadRequest(errors);
    }

    next();
  };

  return func;
};

module.exports = validateJoyWrapper;

// const validateJoyWrapper = (joiSchema) => {
//   const func = (req, res, next) => {
//     const { error } = joiSchema.validate(req.body);

//     if (error) {
//       throw new BadRequest(`Please, ${error.message}`);
//     }
//     next();
//   };

//   return func;
// };
