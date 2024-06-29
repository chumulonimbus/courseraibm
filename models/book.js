const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");

module.exports = book = sequelize.define('Book', {
    bookId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    ISBN: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    createdAt: false,
    updatedAt: false,
});