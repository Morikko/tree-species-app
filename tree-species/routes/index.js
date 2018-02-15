var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.connection.query('SELECT species FROM tree_species;', function (err, rows, fields) {
    if (err) throw err

    let species = rows.map((row)=> row.species);

    res.json(species);
  })
});

module.exports = router;
