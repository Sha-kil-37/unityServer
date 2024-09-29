async function createService(req, res, model) {
  try {
    const createdData = new model(req.body);
    const data = await createdData.save();
    if (data) {
      return res.status(200).end("Created succesfully");
    } else {
      return res.status(500).end("server error");
    }
  } catch (error) {
    return res.status(500).end("Server error");
  }
}
module.exports = createService;
