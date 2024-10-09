const dbConnect = require("./src/config/db/dbConnect");
const app = require("./src/view/app");
require("dotenv").config();
const port = process.env.PORT || 8000;

//
app.listen(port, () => {
  dbConnect();
  console.log(`server running on http://localhost:${port}`);
});
//  
