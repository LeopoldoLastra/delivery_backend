const {Sequelize} = require('sequelize');
const {config} = require ('../config/config');
const setUpModels = require('../db/models/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI =`postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;


const sequelize = new Sequelize(URI,{
  dialect:'postgres',
  logging: false
})



sequelize.sync({ alter: true })
  .then(() => {
    console.log('Conexión a la base de datos exitosa y modelos sincronizados.');
  })
  .catch(error => {
    console.error('Error al conectar a la base de datos:', error);
  });

setUpModels(sequelize);

module.exports = sequelize;
