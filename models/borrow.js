const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BorrowSchema = new Schema({
    member: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date }
});

module.exports = mongoose.model('Borrow', BorrowSchema);