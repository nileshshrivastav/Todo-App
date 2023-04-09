let mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  task: String,
  status: String,
  date: String,
})

module.exports = new mongoose.model('todocontents', todoSchema);
