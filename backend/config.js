const environment = process.env.NODE_ENV || "production";//production or development

if(environment === "production") {
    host = 'acw2033ndw0at1t7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com';
    database = 'j5vsbyhni06zs8op';
    username = 'vexvwjrb7h0ge673';
    password= 'nbobetxbd54bfs0v';
} else {
    host = 'localhost';
    database = "capstone";
    username = 'cristina1';
    password= 'cristinAA$$33';
}
const Sequelize = require('sequelize');
const config = new Sequelize(database, username, password, {dialect: 'mysql', host: host});

module.exports = config;