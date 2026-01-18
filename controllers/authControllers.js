const { NotFound, BadRequest } = require("http-errors");
const createErrorUnauthorized = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const shortid = require("shortid");
const { sendVerifyEmail } = require("../helpers/sendVerifyEmail");
const User = require("../models/User");
const cloudinaryDownload = require("../helpers/cloudinaryDownload");
const { verifycationLetter } = require("../helpers/verifycationLetter");
const { controllerWrapper } = require("../decorators/controllerWrapper");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new createErrorUnauthorized(
      409,
      `Користувач з email ${email} вже зареєстрований`,
    );
  }

  let avatar = null;

  if (req.file) {
    avatar = await cloudinaryDownload(req.file, "avatars", [
      { width: 250, height: 350 },
    ]);
  } else {
    avatar = gravatar.url(email);
  }

  const verificationToken = shortid.generate();

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatar,
    verificationToken,
  });

  const verifyEmail = verifycationLetter({ email, verificationToken });

  await sendVerifyEmail(verifyEmail);

  res.status(201).json({
    status: "Created",
    code: 201,
    user: {
      email,
      name,
      avatar,
      subscription: newUser.subscription,
      role: newUser.role,
    },
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw NotFound("Користувача не знайдено або пошта вже підтверджена");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    status: "Success",
    code: 200,
    data: {
      message: "Верифікація успішна",
    },
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw NotFound("Користувача з такою поштою не знайдено");
  }
  if (user.verify) {
    throw BadRequest("Верифікація вже пройдена");
  }

  const verifyEmail = verifycationLetter({
    email,
    verificationToken: user.verificationToken,
  });

  await sendVerifyEmail(verifyEmail);

  res.json({
    status: "Success",
    code: 200,
    message: "Лист для підтвердження надіслано",
  });
};

const login = async (req, res) => {
  const { email, password = "" } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new createErrorUnauthorized(403, "Електронна пошта вказана невірно");
  }

  if (!user.verify) {
    throw new createErrorUnauthorized(401, "Електронна пошта не підтверджена");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare || password === "") {
    throw new createErrorUnauthorized(403, "Пароль вказано невірно");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "5h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    status: "Success",
    code: 200,
    token,
    user: {
      email,
      name: user.name,
      avatar: user.avatar,
      subscription: user.subscription,
      role: user.role,
    },
  });
};

const curent = async (req, res) => {
  const { name, email, subscription, avatar, role } = req.user;
  res.json({
    status: "Success",
    code: 200,
    user: {
      name,
      email,
      subscription,
      avatar,
      role,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).send();
};

module.exports = {
  register: controllerWrapper(register),
  verifyEmail: controllerWrapper(verifyEmail),
  resendVerifyEmail: controllerWrapper(resendVerifyEmail),
  login: controllerWrapper(login),
  curent: controllerWrapper(curent),
  logout: controllerWrapper(logout),
};
