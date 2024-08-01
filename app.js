const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const routes = require("./routes/noteRoutes");

const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Your application is up and running!✅" });
});

//Route
app.use("/notes", routes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
