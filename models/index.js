const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
});

const Item = sequelize.define('Item', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stage: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
}, {
    timestamps: false,
});

module.exports = { sequelize, Item };
