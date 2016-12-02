var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/', function(req, res, next){
  res.render('archive', {title: "Steve's Column Compiler"})
});

module.exports = router;
