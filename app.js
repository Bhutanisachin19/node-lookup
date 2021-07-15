const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const cors = require("cors");

const userRoute = require("./routes/user");

const mongoURI = "mongodb://localhost:27017/mongoQuery";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use("/api/user", userRoute);

app.listen(8080, () => console.log("Server running at 8080..."));
