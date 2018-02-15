const Sequelize = require('sequelize');
var db = require('../config').database;
const sequelize = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const TreeSpecies = sequelize.define('tree_species', {
  species: Sequelize.STRING
}, {
  timestamps: false,
  tableName: 'tree_species',
});

let models = {};
models.sequelize = sequelize;

module.exports = models;
