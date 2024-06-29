const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

dotenv.config();

exports.sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

exports.dbConnect = async ()=> {
    try {
        console.log("Successfuly connect to database!");
    } catch (error) {
        console.log("Cant connect to database", { message: error.message });
    }
}