//
const multer = require("multer");
const path = require("path");
//
const userProfileUploadMulter = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const extName = path.extname(file.originalname);
    if (extName == ".jpg" || extName == ".jpeg" || extName == ".png") {
      cb(null, true);
    } else {
      cb(new Error("File type not allowed!"), false);
    }
  },
  //   limits: {
  //     fileSize: 2000000, // 2.MB
  //   },
});
//
module.exports = userProfileUploadMulter;
