const Sequelize = require('sequelize');
const config = require('./../config');

const Class = config.define('classes', {
    classId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    startTime: {
        type: Sequelize.TIME,
        allowNull: false
    },
    endTime: {
        type: Sequelize.TIME,
        allowNull: false
    },
    day: {
        type: Sequelize.STRING,
        allowNull: false
    },
    classTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {timestamps:false});

module.exports = Class;