const _ = require("lodash");
const User = require("../models/user");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not found" });
    }
    req.user = user;
    next();
  });
};

exports.hasAuthorization = (req, res, next) => {
  const authorized = req.user && req.auth && req.user._id === req.auth._id;
  if (!authorized) {
    return res
      .status(403)
      .json({ error: "User is not authorized to perform this action" });
  }
};

exports.allUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.json({ users });
  }).select("name email updated created");
};

exports.getUser = (req, res) => {
  req.user.salt = undefined;
  req.user.hashed_password = undefined;
  return res.json(req.user);
};

exports.updateUser = (req, res, next) => {
  let user = req.user;
  user = _.extend(user, req.body);
  user.updated = Date.now();
  user.save((err) => {
    if (err) {
      return res
        .status(400)
        .json({ error: "You are not authorized to perform this action" });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    return res.json({ user });
  });
};
