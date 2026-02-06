require("dotenv").config();
require("./config/db");
const app = require("./app");

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);
