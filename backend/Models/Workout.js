const Sequelize =  require('sequelize');
const config = require('../config');

const Workout = config.define("workouts", {
    workoutId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
}, {timestamps: false});

module.exports = Workout;