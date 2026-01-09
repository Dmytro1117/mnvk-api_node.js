const express = require("express");
const { updateAvatar } = require("../controllers/userControllers");
const authenticate = require("../middlewares/authenticate");
const multerDownload = require("../middlewares/multerDownload");

const userRouter = express.Router();

userRouter.use(authenticate);

userRouter.patch(
  "/avatars",
  authenticate,
  multerDownload.single("avatar"),
  updateAvatar
);

module.exports = userRouter;
