var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.get('/gameone', function(req, res, next) {
  res.render('games/gameOne');
});

router.get('/gameonecontroller', function(req, res, next) {
  res.render('games/gameOnePhone');
});





module.exports = router;
