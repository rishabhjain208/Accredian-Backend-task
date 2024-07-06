const express = require("express");
const userRoutes = require("./routes/userRoutes");
const emailRoutes = require("./routes/referRoutes");
const cors = require("cors");
require("dotenv").config();

const bodyparser = require("body-parser");
const options = {
  origin: true,
};
const app = express();

app.use(express.json());
app.use(cors(options));
app.use(express.json());
app.use(bodyparser.json());

// app.use("/", (req, res) => {
//   res.send("Hello World");
// });

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/email", emailRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
