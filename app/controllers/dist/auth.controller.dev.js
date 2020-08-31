"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var db = require("../models");

var config = require("../config/auth.config");

var User = db.user;
var Role = db.role;
var Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");

var bcrypt = require("bcryptjs");

exports.signup = function (req, res) {
  // Save User to Database
  User.create({
    username: req.body.username,
    // email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  }).then(function (user) {
    if (req.body.roles) {
      Role.findAll({
        where: {
          name: _defineProperty({}, Op.or, req.body.roles)
        }
      }).then(function (roles) {
        user.setRoles(roles).then(function () {
          res.send({
            message: "User registered successfully!"
          });
        });
      });
    } else {
      // user role = 1
      user.setRoles([1]).then(function () {
        res.send({
          message: "User registered successfully!"
        });
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message
    });
  });
};

exports.signin = function (req, res) {
  User.findOne({
    where: {
      username: 'sonpx' //req.body.username

    }
  }).then(function (user) {
    if (!user) {
      return res.status(404).send({
        message: "User Not found."
      });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    var token = jwt.sign({
      id: user.id
    }, config.secret, {
      expiresIn: 86400 // 24 hours

    });
    var authorities = [];
    user.getRoles().then(function (roles) {
      for (var i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }

      res.status(200).send({
        id: user.id,
        username: user.username,
        // balance: user.balance,
        roles: authorities,
        accessToken: token
      });
    });
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message
    });
  });
};