var mongoose = require('mongoose');

var ColumnSchema = new mongoose.Schema({
  headline: String,
  date: Date,
  keywords: Array,
  body: String
})

mongoose.model('Column', ColumnSchema);
