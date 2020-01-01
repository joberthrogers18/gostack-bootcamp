module.exports = (sequelize, dataTypes) => {
  const User = sequelize.define('User', {
    name: dataTypes.STRING,
    email: dataTypes.STRING,
    avatar: dataTypes.STRING,
    password_hash: dataTypes.STRING,
    provider: dataTypes.BOOLEAN
  })

  return User
};
