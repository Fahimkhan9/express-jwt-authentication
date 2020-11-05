const User = require("../models/User");

module.exports.signup_get = (req, res) => {
  res.render("signup");
};
module.exports.login_get = (req, res) => {
  res.render(" new login");
};
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(404).send("error");
  }
};

module.exports.login_post = async (req, res) => {
  console.log(req.body);
  res.render("signup");
};
