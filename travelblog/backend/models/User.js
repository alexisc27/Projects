const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        }
    },
    address: {
        type: DataTypes.STRING
    }
}, {
    timestamps: true
});

// Associations
User.associate = (models) => {
    User.hasMany(models.TravelLog, { foreignKey: 'userId' });
    User.hasMany(models.JourneyPlan, { foreignKey: 'userId' });
};

module.exports = User;