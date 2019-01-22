module.exports = function (sequelize, DataTypes) {
  var Brewery = sequelize.define("Brewery", {
    breweryName: DataTypes.STRING,
    address: DataTypes.STRING,
    breweryAPIid: DataTypes.STRING
  });

  Brewery.associate = function (models) {

    Brewery.belongsToMany(models.User, {
      through: 'UserBrewery'
    });
  };

  return Brewery;
};