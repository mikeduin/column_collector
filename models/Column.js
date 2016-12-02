var mongoose = require('mongoose');

var ColumnSchema = new mongoose.Schema({
  headline: String,
  date: Date,
  datecode: String,
  keywords: Array,
  body: String,
  logged: Date
})

mongoose.model('Column', ColumnSchema);
