// not found controller
async function notFount(req, res) {
  //   console.log(req);
  return res.status(400).end("Not found");
}
//
module.exports = notFount;
