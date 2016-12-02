var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Column = mongoose.model('Column');

router.get('/', function(req, res, next){
  Column.find(function(err, columns){
    res.render('archive', {
      title: "Steve's Column Compiler",
      columns: columns
    })
  })

});

module.exports = router;
