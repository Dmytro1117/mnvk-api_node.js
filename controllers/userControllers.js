const { BadRequest } = require("http-errors");
const User = require("../models/User");
const cloudinaryDownload = require("../helpers/cloudinaryDownload");
const { controllerWrapper } = require("../decorators/controllerWrapper");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  if (!req.file) {
    throw new BadRequest(`Please, input file`);
  }

  const avatar = await cloudinaryDownload(req.file, "avatars", [
    { width: 250, height: 350 },
  ]);

  await User.findByIdAndUpdate(_id, { avatar });

  res.json({
    status: "Succes",
    code: 200,
    avatar,
  });
};

module.exports = {
  updateAvatar: controllerWrapper(updateAvatar),
};
