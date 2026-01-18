const multer = require("multer");
const path = require("path");
const { BadRequest } = require("http-errors");

const destinationTemp = path.resolve("temp");

const multerConfig = multer.diskStorage({
  destination: destinationTemp,
  filename: (req, file, callback) => {
    const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePreffix}_${file.originalname}`;
    callback(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 10,
};

const fileFilter = (req, file, callback) => {
  if (!file.mimetype.startsWith("image/")) {
    return callback(new BadRequest("Only images are allowed!"), false);
  }
  callback(null, true);
};

const multerDownload = multer({
  storage: multerConfig,
  limits,
  fileFilter,
});

module.exports = multerDownload;
