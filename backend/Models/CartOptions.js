const Sequelize = require('sequelize');
const config = require('./../config');

const CartOption = config.define('cartOptions', {
    cartId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    purchaseType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    instances: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {timestamps:false});

module.exports = CartOption;