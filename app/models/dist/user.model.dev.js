"use strict";

module.exports = function (sequelize, Sequelize) {
  var User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING
    },
    balance: {
      type: Sequelize.INTEGER
    },
    password: {
      type: Sequelize.STRING
    }
  });
  return User;
};