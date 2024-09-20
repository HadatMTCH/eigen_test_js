const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  stock: { type: Number, required: true },
  availableStock: { type: Number, required: true }
});

module.exports = mongoose.model('Book', BookSchema);