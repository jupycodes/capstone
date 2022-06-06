const Sequelize =  require('sequelize');
const Class = require('./Class');
const User = require('./User');
const config = require('../config');

const ClassRegistration = config.define("classRegistrations", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    classId: {
        type: Sequelize.INTEGER,
        references: {
            model: Class,
            key: 'classId'
        },
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'userId'
        },
        allowNull: false
    },

}, {timestamps: false});

module.exports = ClassRegistration;