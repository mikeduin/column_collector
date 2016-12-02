var mongoose = require('mongoose');

var ColumnSchema = new mongoose.Schema({
  headline: String,
  date: Date,
  keywords: Array,
  body: String,
  logged: Date
})

mongoose.model('Column', ColumnSchema);
