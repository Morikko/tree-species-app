var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET cout tree species */
router.get('/species/count', function(req, res, next) {
  db.connection.query('SELECT COUNT(*) AS count FROM tree_species;', function (err, rows, fields) {
    if (err) throw err

    res.json(rows[0].count);
  })
});

/* GET All tree species */
router.get('/species', function(req, res, next) {
  db.connection.query('SELECT species FROM tree_species;', function (err, rows, fields) {
    if (err) throw err

    let species = rows.map((row)=> row.species);

    res.json(species);
  })
});

/* GET 3 tree species */
router.get('/species/page/:nb(\\d+)', function(req, res, next) {
  let nb = parseInt(req.params.nb, 10);
  let offset = nb > 0 ? ("OFFSET "+3*nb): "";
  let query = `SELECT species FROM tree_species LIMIT 3 ${offset};`

  console.log(query);
  db.connection.query(query, function (err, rows, fields) {
    if (err) throw err

    let species = rows.map((row)=> row.species);

    res.json(species);
  })
});

module.exports = router;
