var mysql = require('mysql')
var config = require('./config');

var db = {};
db.connection = mysql.createConnection(config.database);

/** Create DB **/
let queryCreateDB = `CREATE DATABASE IF NOT EXISTS ${config.database.database}`,
    queryUseDB = `USE ${config.database.database}`,
    queryCreateTable = 'CREATE TABLE IF NOT EXISTS tree_species('
        + 'id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,'
        + 'species TEXT'
        +  ')',
    queryCleanDB = 'DELETE FROM tree_species',
    queryFillDB = 'INSERT INTO tree_species (species) VALUES ("Acacia"), ("Baobab"), ("Cedar"), ("Cypress"), ("Plantanus"), ("Olive Tree"), ("Oak"), ("Pine"), ("Sequoia"), ("Maple"), ("Elm")';

db.connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected to your MySQL database...')
})

if( process.env.CREATE_DB ) {
  db.connection.query(queryCreateDB, function (err) {
    if (err) throw err;
    db.connection.query(queryUseDB, function (err) {
      if (err) throw err;
      db.connection.query(queryCreateTable, function (err) {
        if (err) throw err;
        db.connection.query(queryCleanDB, function (err) {
          if (err) throw err;
          db.connection.query(queryFillDB, function (err) {
            if (err) throw err;
          });
        });
      });
    });
  });
}

module.exports = db;
