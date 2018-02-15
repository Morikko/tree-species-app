var mysql = require('mysql')
var config = require('./config');

var db = {};
db.connection = mysql.createConnection(config.database);

module.exports = db;
