const Sequelize =  require('sequelize');
const config = require('../config');

const ClassType = config.define("classTypes", {
    classTypeId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    maxLimit: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

}, {timestamps: false});

module.exports = ClassType;