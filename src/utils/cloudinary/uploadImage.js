// cloudinary
const cloudinary = require("../cloudinary/cloudinary");
// upload image cloudinary
async function uploadImage(path, id, folder, height, width) {  
  return await cloudinary.uploader.upload(path, {
    folder: folder,
    public_id: id,
    resource_type: "image",
    transformation: [
      {
        height: height,
        width: width,
      },
    ],
  });
}
//
module.exports = uploadImage;
