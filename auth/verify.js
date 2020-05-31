const jwt = require("jsonwebtoken");
const User = require("../models/users");

module.exports.verifyUser = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Login Credentials Invalid.");
    }
    const authToken = req.headers.authorization.split(" ")[1];
    const authDetails = await new Promise((data) =>
      jwt.verify(
        authToken,
        process.env.SECRET_KEY,
        {
          issuer: "yashvardhan",
        },
        (err, decoded) => {
          if (err) {
            throw err;
          }
          return data(decoded);
        }
      )
    );
    const user = await User.findOne({ email: authDetails.email });
    res.locals.user = user;
    next();
  } catch (err) {
    console.log(err);
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      res.status(401).json({
        status: "ERROR",
        error: `${err.name}`,
      });
    } else if (err.name === "SyntaxError") {
      res.status(401).json({
        status: "ERROR",
        error: `${err.name}`,
      });
    } else {
      res.status(401).json({
        status: "ERROR",
        error: `${err.message}`,
      });
    }
  }
};
