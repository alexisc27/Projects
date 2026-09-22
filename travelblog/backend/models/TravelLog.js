const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const TravelLog = sequelize.define('TravelLog', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
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
        postDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        }
    });

    TravelLog.associate = (models) => {
        TravelLog.belongsTo(models.User, { foreignKey: 'userId' });
    };

    return TravelLog;
};