const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      throw new Error("User is already registered!");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      tasks: [],
    });
    const result = await user.save();
    if (result) {
      res.status(200).json({
        status: "OK",
      });
    }
  } catch (err) {
    res.status(406).json({
      status: "ERROR",
      error: `${err.message}`,
    });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Username or Password Wrong!");
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      throw new Error("Username or Password Wrong!");
    }
    const userJwt = jwt.sign({ email: email }, process.env.SECRET_KEY, {
      issuer: "yashvardhan",
      expiresIn: "1h",
    });
    res.status(200).json({
      status: "OK",
      authToken: userJwt,
    });
  } catch (err) {
    res.status(403).json({
      status: "ERROR",
      error: `${err.message}`,
    });
  }
};
