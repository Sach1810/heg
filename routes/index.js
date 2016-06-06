var express = require('express');
var router = express.Router();

router.io = require('socket.io')();

// start listen with socket.io

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/register', function(req, res, next){
  console.log("body");
});



module.exports = router;
