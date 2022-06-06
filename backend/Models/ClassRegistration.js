const Sequelize =  require('sequelize');
const config = require('../config');

const ClassRegistration = config.define("classRegistrations", {
    classId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    registeredUserId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

}, {timestamps: false});

module.exports = ClassRegistration;