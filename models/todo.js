'use strict';
module.exports = function(sequelize, DataTypes) {
  var todo = sequelize.define('todo', {
    item: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return todo;
};