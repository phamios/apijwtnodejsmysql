module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
  
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
