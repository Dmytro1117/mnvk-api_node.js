const { NotFound } = require("http-errors");
const Profession = require("../models/Profession");
const { controllerWrapper } = require("../decorators/controllerWrapper");
const cloudinaryDownload = require("../helpers/cloudinaryDownload");

const getAllProfessions = async (req, res) => {
  const professions = await Profession.find(
    {},
    "-lectures -about.text -createdAt -updatedAt",
  );

  res.json({
    status: "Success",
    code: 200,
    professions,
  });
};

const getProfessionById = async (req, res) => {
  const { id } = req.params;
  const profession = await Profession.findById(id, "-createdAt -updatedAt");

  if (!profession) {
    throw new NotFound(`Profession with id=${id} not found`);
  }

  res.json({
    status: "Success",
    code: 200,
    profession,
  });
};

const addProfession = async (req, res) => {
  let mainImage = null;
  if (req.files?.cover) {
    mainImage = await cloudinaryDownload(
      req.files.cover[0],
      "professions/main",
    );
  }
  let posterImage = null;
  if (req.files?.poster) {
    posterImage = await cloudinaryDownload(
      req.files.poster[0],
      "professions/poster",
    );
  }

  const galleryUrls = [];
  if (req.files?.photos) {
    for (const file of req.files.photos) {
      const url = await cloudinaryDownload(file, "professions/gallery");
      galleryUrls.push({ url });
    }
  }

  const newProfession = await Profession.create({
    ...req.body,
    "about.image": mainImage,
    poster: posterImage,
    gallery: galleryUrls,
  });

  res.status(201).json({
    status: "Created",
    code: 201,
    data: newProfession,
  });
};

const addPhotosToGallery = async (req, res) => {
  const { id } = req.params;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "Файлы не выбраны" });
  }

  const newPhotos = [];
  if (req.files) {
    for (const file of req.files) {
      const url = await cloudinaryDownload(file, "professions/gallery");
      newPhotos.push({ url });
    }
  }

  const result = await Profession.findByIdAndUpdate(
    id,
    {
      $push: { gallery: { $each: newPhotos } },
    },
    { new: true },
  ).select("-createdAt -updatedAt");

  if (!result) {
    return res.status(404).json({ message: "Профессия не найдена" });
  }

  res.json({
    status: "Success",
    code: 200,
    data: {
      result,
    },
  });
};

const addLecture = async (req, res) => {
  const { id } = req.params;
  const { lectureTitle, content } = req.body;

  const result = await Profession.findByIdAndUpdate(
    id,
    {
      $push: { lectures: { lectureTitle, content } },
    },
    { new: true, runValidators: true },
  ).select("-createdAt -updatedAt");

  if (!result) {
    throw new NotFound(`Profession with id=${id} not found`);
  }

  res.json({
    status: "Success",
    code: 200,
    data: {
      result,
    },
  });
};

const deleteProfession = async (req, res) => {
  const { id } = req.params;
  const result = await Profession.findByIdAndDelete(id);

  if (!result) {
    throw new NotFound(`Profession with id=${id} not found`);
  }

  res.json({
    status: "Success",
    code: 200,
    message: "Profession deleted",
    data: { id },
  });
};

const deleteLecture = async (req, res) => {
  const { id, lectureId } = req.params;
  const result = await Profession.findByIdAndUpdate(
    id,
    { $pull: { lectures: { _id: lectureId } } },
    { new: true },
  );
  if (!result) throw new NotFound("Not found");
  res.json({ status: "Success", code: 200, data: result });
};

const deletePhoto = async (req, res) => {
  const { id, photoId } = req.params;
  const result = await Profession.findByIdAndUpdate(
    id,
    { $pull: { gallery: { _id: photoId } } },
    { new: true },
  );
  if (!result) throw new NotFound("Not found");
  res.json({ status: "Success", code: 200, data: result });
};

module.exports = {
  getAllProfessions: controllerWrapper(getAllProfessions),
  getProfessionById: controllerWrapper(getProfessionById),
  addProfession: controllerWrapper(addProfession),
  addPhotosToGallery: controllerWrapper(addPhotosToGallery),
  deleteProfession: controllerWrapper(deleteProfession),
  addLecture: controllerWrapper(addLecture),
  deleteLecture: controllerWrapper(deleteLecture),
  deletePhoto: controllerWrapper(deletePhoto),
};
