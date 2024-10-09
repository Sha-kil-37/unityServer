const mongoose = require("mongoose");
//suplayer schema
const suplayerSchema = new mongoose.Schema(
  {
    suplayerName: { type: String, required: true },
    suplayerEmail: { type: String, required: true },
    suplayerNumber: { type: Number, required: true },
    userEmail: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const suplayerModel = mongoose.model("suplayer", suplayerSchema);
//
module.exports = suplayerModel;
