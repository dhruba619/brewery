module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1],
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
        notEmpty: true
      }
    }
  });

  User.associate = function (models) {

    User.belongsToMany(models.Brewery, {
      through: 'UserBrewery'
    });
  };

  return User;
};