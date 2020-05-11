const jwt = require("jsonwebtoken");
require("dotenv").config();
const expressJwt = require("express-jwt");
const User = require("../models/user");

exports.signup = async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) return res.status(403).json({ error: "Email is taken!" });
  const user = await new User(req.body);
  await user.save();
  res.json({ message: "Signup success! Please login." });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(401)
        .json({ error: "User with that email does not exist." });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match.",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("jwt", token, { expire: new Date() + 60 * 60 * 24 });
    const { _id, name, email } = user;
    return res.json({ token, user: { _id, name, email } });
  });
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  return res.json({ message: "Logout successful!" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
});
