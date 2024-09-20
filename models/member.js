const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    borrowedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    penaltyUntil: { type: Date, default: null }
  });

module.exports = mongoose.model('Member', MemberSchema);