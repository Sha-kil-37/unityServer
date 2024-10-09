// check image from cloudinary
const cloudinary = require("./cloudinary");
//
async function chekImageExist(folder, publicId) {
  return await cloudinary.api.resources({
    type: "upload",
    prefix: `${folder}/${publicId}`,
  });
}
//
module.exports = chekImageExist;
