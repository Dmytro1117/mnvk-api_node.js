const cloudinary = require("./cloudinaryConfig");

const cloudinaryDelete = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    // Витягуєм public_id з посилання Cloudinary

    const parts = imageUrl.split("/");
    const folderIndex = parts.indexOf("MNVK");
    const publicIdWithExtension = parts.slice(folderIndex).join("/");
    const publicId = publicIdWithExtension.split(".")[0];

    // console.log("Generated Public ID for Cloudinary:", publicId);

    const result = await cloudinary.uploader.destroy(publicId);

    // console.log("Cloudinary response:", result);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
  }
};

module.exports = cloudinaryDelete;
