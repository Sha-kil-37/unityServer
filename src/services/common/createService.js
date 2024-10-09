// create service
async function createService(req, res, model) {
  try {
    const data = await model.create(req.body);
    if (data) {
      return res.status(200).end("Created succesfully");
    } else {
      return res.status(500).end("server error");
    }
  } catch (error) {
    if (error.errorResponse.code === 11000) {
      return res.status(400).end("This email already exist");
    } else {
      return res.status(500).end("Server error");
    }
  }
}
module.exports = createService;
