const { Forbidden } = require("http-errors");

const isAdmin = (req, res, next) => {
  const { role } = req.user;

  if (role !== "admin") {
    return next(Forbidden("Access denied. Admin rights required."));
  }

  next();
};

module.exports = isAdmin;
