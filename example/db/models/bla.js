'use strict';
module.exports = (sequelize, DataTypes) => {
  const bla = sequelize.define('bla', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {});
  bla.associate = function (models) {
  };
  return bla;
};
