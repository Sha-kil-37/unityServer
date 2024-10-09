// update service
// mongoose
const mongoose = require("mongoose");
async function updateService(req, res, model) {
  try {
    const id = new mongoose.Types.ObjectId(req.query.id);
    const result = await model.updateOne(
      { _id: id, userEmail: req.headers.email },
      { $set: req.body }
    );
    if (result.modifiedCount === 1) {
      return res.status(200).end("Update successfully");
    } else {
      return res.status(400).end("Invalid request");
    }
  } catch (error) {
    return res.status(500).end("Server error");
  }
}
//
module.exports = updateService;
