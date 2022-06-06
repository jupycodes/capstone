const Sequelize =  require('sequelize');
const config = require('../config');

const Purchase = config.define("purchases", {
    purchaseId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, 
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, 
    date: {
        type: Sequelize.DATE,
        allowNull: false
    }, 
}, {timestamps: false});

module.exports = Purchase;