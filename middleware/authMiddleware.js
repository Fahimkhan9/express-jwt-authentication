const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config({ path: "../config/.env" });
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, `${process.env.jwt_secret}`, (err, decodedtoken) => {
      if (err) {
        console.log(error.message);
        res.redirect("/login");
      } else {
        console.log(decodedtoken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};
//check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      `${process.env.jwt_secret}`,
      async (err, decodedtoken) => {
        if (err) {
          console.log(error.message);
          res.locals.user = null;
          next();
        } else {
          console.log(decodedtoken);
          let user = await User.findById(decodedtoken.id);
          res.locals.user = user;
          next();
        }
      }
    );
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
