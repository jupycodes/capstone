const Sequelize = require('sequelize');
const config = require('./../config');

const User = config.define('users', {
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    birthday: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: true
    },
    waiverSigned: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    activeMembership: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isAdmin: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
}, {timestamps:false});

module.exports = User;