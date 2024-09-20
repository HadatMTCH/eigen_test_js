const Book = require('../models/book');
const Member = require('../models/member');
const Borrow = require('../models/borrow');

exports.borrowBook = async (req, res) => {
  try {
    const { memberId, bookId } = req.body;

    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    if (member.borrowedBooks.length >= 2) {
      return res.status(400).json({ error: 'Member has already borrowed the maximum number of books' });
    }

    if (member.penaltyUntil && member.penaltyUntil > new Date()) {
      return res.status(400).json({ error: 'Member is currently penalized' });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (book.availableStock <= 0) {
      return res.status(400).json({ error: 'Book is not available' });
    }

    const borrow = new Borrow({ member: memberId, book: bookId });
    await borrow.save();

    book.availableStock -= 1;
    await book.save();

    member.borrowedBooks.push(bookId);
    await member.save();

    res.status(200).json({ message: 'Book borrowed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while borrowing the book' });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { memberId, bookId } = req.body;

    const borrow = await Borrow.findOne({ member: memberId, book: bookId, returnDate: null });
    if (!borrow) {
      return res.status(404).json({ error: 'Borrow record not found' });
    }

    const now = new Date();
    const borrowDuration = now - borrow.borrowDate;
    const daysLate = Math.floor(borrowDuration / (1000 * 60 * 60 * 24)) - 7;

    borrow.returnDate = now;
    await borrow.save();

    const book = await Book.findById(bookId);
    book.availableStock += 1;
    await book.save();

    const member = await Member.findById(memberId);
    member.borrowedBooks = member.borrowedBooks.filter(id => id.toString() !== bookId);

    if (daysLate > 0) {
      const penaltyUntil = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
      member.penaltyUntil = penaltyUntil;
    }

    await member.save();

    res.status(200).json({ message: 'Book returned successfully', daysLate });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while returning the book' });
  }
};

exports.checkBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching books' });
  }
};

exports.checkMembers = async (req, res) => {
  try {
    const members = await Member.find().populate('borrowedBooks');
    const membersWithBookCount = members.map(member => ({
      ...member.toObject(),
      borrowedBooksCount: member.borrowedBooks.length
    }));
    res.status(200).json(membersWithBookCount);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching members' });
  }
};