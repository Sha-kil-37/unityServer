//  image delete cloudinary
const cloudinary = require("../cloudinary/cloudinary");
//

async function deleteImage(folder, public_id) {
  return await cloudinary.uploader.destroy(`${folder}/${public_id}`);
}

//
module.exports = deleteImage;
