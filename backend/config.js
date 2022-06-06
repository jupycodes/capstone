const environment = process.env.NODE_ENV || "development";//production or development

if(environment === "production") {
    host = '';
    database = '';
    username = '';
    password= '';
} else {
    host = 'localhost';
    database = "capstone";
    username = 'cristina1';
    password= 'cristinAA$$33';
}
const Sequelize = require('sequelize');
const config = new Sequelize(database, username, password, {dialect: 'mysql', host: host});

module.exports = config;