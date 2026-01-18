const { Schema, model } = require("mongoose");
const { handleSaveError } = require("../middlewares/handleSaveError");
const { setUpdateOptions } = require("../helpers/setUpdateOptions");

const professionSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      unique: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["driver", "secretary", "web", "locksmith", "cook", "psychologist"],
    },

    poster: { type: String, default: "" },

    about: {
      text: { type: String, required: true },
      image: { type: String, default: "" },
    },

    lectures: [
      {
        lectureTitle: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],

    gallery: [
      {
        url: { type: String, required: true },
        public_id: String,
      },
    ],
  },
  { versionKey: false, timestamps: true },
);

professionSchema.post("save", handleSaveError);
professionSchema.pre("findOneAndUpdate", setUpdateOptions);
professionSchema.post("findOneAndUpdate", handleSaveError);

const Profession = model("profession", professionSchema);

module.exports = Profession;
