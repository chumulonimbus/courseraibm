const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

module.exports = user = sequelize.define('User', {
    uid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
},
{
    createdAt: false,
    updatedAt: false,
});