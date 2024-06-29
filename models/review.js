const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbConfig");
const user = require("./user.js")
const book = require("./book.js")

module.exports = review = sequelize.define('Review', {
    rid:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: book, 
            key: 'bookId',
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user, 
            key: 'uid',
        }
    },
    review: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    createdAt: false,
    updatedAt: false,
});

user.hasMany(review, { foreignKey: 'userId' });
book.hasMany(review, { foreignKey: 'bookId' });
review.belongsTo(book, { foreignKey: 'bookId' });
review.belongsTo(user, { foreignKey: 'userId' });