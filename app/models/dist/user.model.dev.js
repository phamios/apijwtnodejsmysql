"use strict";

module.exports = function (sequelize, Sequelize) {
  var User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    balance: {
      type: Sequelize.DOUBLE
    },
    password: {
      type: Sequelize.STRING
    }
  });
  return User;
};