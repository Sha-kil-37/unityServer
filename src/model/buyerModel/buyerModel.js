const mongoose = require("mongoose");
//buyer schema
const buyerSchema = new mongoose.Schema(
  {
    buyerName: { type: String, required: true },
    buyerEmail: { type: String, required: true },
    buyerNumber: { type: Number, required: true },
    userEmail: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const buyerModel = mongoose.model("buyer", buyerSchema);
//
module.exports = buyerModel;
