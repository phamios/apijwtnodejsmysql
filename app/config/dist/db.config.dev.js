"use strict";

module.exports = {
  HOST: "us-cdbr-east-02.cleardb.com",
  USER: "b53b02b8ca0565",
  PASSWORD: "2d62a7ea",
  DB: "heroku_64c2a3ffbbc6876",
  // dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};