const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const JourneyPlan = sequelize.define('JourneyPlan', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        locations: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        activities: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        },
        description: {
            type: DataTypes.TEXT
        }
    });

    JourneyPlan.associate = (models) => {
        JourneyPlan.belongsTo(models.User, { foreignKey: 'userId' });
    };

    return JourneyPlan;
};