const { DataTypes } = require('sequelize');
const { db } = require('../databases/db');

const Restaurant = db.define('restaurant', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  /* Creating a column called name in the database. It is a string and it is unique and it cannot be
 null. */
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});
module.exports = Restaurant;
