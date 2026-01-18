const express = require("express");
const validateJoyWrapper = require("../decorators/validateJoyWrapper");
const {
  addProfessionJoiSchema,
  addLectureJoiSchema,
  deletePhotoJoiSchema,
  deleteLectureJoiSchema,
} = require("../schemas/professionJoiSchemas");
const multerDownload = require("../middlewares/multerDownload");
const {
  addProfession,
  getAllProfessions,
  getProfessionById,
  addLecture,
  deleteLecture,
  deletePhoto,
  deleteProfession,
  addPhotosToGallery,
} = require("../controllers/professionControllers");
const authenticate = require("../middlewares/authenticate");
const isAdmin = require("../middlewares/isAdmin");

const professionRouter = express.Router();
professionRouter.use(authenticate);

professionRouter.get("/", getAllProfessions);

professionRouter.get("/:id", getProfessionById);

professionRouter.post(
  "/",
  isAdmin,
  multerDownload.fields([
    { name: "cover", maxCount: 1 },
    { name: "poster", maxCount: 1 },
    { name: "photos", maxCount: 10 },
  ]),
  validateJoyWrapper(addProfessionJoiSchema),
  addProfession,
);

professionRouter.patch(
  "/:id/lectures",

  isAdmin,
  validateJoyWrapper(addLectureJoiSchema),
  addLecture,
);

professionRouter.patch(
  "/:id/gallery",
  isAdmin,
  multerDownload.array("photos", 10),
  addPhotosToGallery,
);

professionRouter.delete(
  "/:id/lectures/:lectureId",
  isAdmin,
  validateJoyWrapper(deleteLectureJoiSchema, "params"),
  deleteLecture,
);

professionRouter.delete(
  "/:id/gallery/:photoId",
  isAdmin,
  validateJoyWrapper(deletePhotoJoiSchema, "params"),
  deletePhoto,
);

professionRouter.delete("/:id", isAdmin, deleteProfession);

module.exports = professionRouter;
