require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const verifyUser = require("./auth/verify").verifyUser;
const cors = require("cors");

const app = express();

const tasksRoutes = require("./routes/tasks");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "./client/build")));

app.use("/api/auth", authRoutes);
app.use("/api/tasks", verifyUser, tasksRoutes);
app.get("/*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server Listening on Port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
