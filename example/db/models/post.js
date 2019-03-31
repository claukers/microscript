'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {});
  post.associate = (models) => {
  };
  return post;
};
