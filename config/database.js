const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('utn-final-integrador', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
    });

    module.exports = sequelize;
