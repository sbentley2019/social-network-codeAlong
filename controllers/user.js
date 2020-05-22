const _ = require("lodash");
const User = require("../models/user");
const formidable = require("formidable");
const fs = require("fs");

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

exports.updateUser = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image could not be uploaded" });
    }
    let user = req.user;
    user = _.extend(user, fields);
    user.updated = Date.now();
    if (files.photo) {
      user.photo.data = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }
    user.save((err, result) => {
      if (err) {
        console.log("err", err);
        return res
          .status(400)
          .json({ error: "You are not authorized to perform this action" });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      return res.json(user);
    });
  });
};

exports.userPhoto = (req, res, next) => {
  if (req.user.photo.data) {
    res.set(("Content-Type", req.user.photo.contentType));
    return res.send(req.user.photo.data);
  }
  next();
};

exports.deleteUser = (req, res) => {
  let user = req.user;
  user.remove((err, user) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    return res.json({ message: "User deleted successfully" });
  });
};
