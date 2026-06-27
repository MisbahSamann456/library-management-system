const User = require('../models/User');
const Borrow = require('../models/Borrow');
const Book = require('../models/Book');

exports.getAllMembers = async (req, res, next) => {
  try {
    const members = await User.find({ role: 'member' }).select('-password');
    res.json({ success: true, members });
  } catch (error) {
    next(error);
  }
};

exports.deleteMember = async (req, res, next) => {
  try {
    const member = await User.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: 'Member not found' });
    res.json({ success: true, message: 'Member deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.borrowBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    if (book.availableQuantity <= 0) return res.status(400).json({ success: false, message: 'Book is currently unavailable' });

    const alreadyBorrowed = await Borrow.findOne({ memberId: req.user._id, bookId: book._id, status: 'borrowed' });
    if (alreadyBorrowed) return res.status(400).json({ success: false, message: 'You already borrowed this book' });

    await Borrow.create({ memberId: req.user._id, bookId: book._id });
    book.availableQuantity -= 1;
    await book.save();

    res.status(201).json({ success: true, message: 'Book borrowed successfully' });
  } catch (error) {
    next(error);
  }
};

exports.returnBook = async (req, res, next) => {
  try {
    const borrow = await Borrow.findOne({ memberId: req.user._id, bookId: req.params.id, status: 'borrowed' });
    if (!borrow) return res.status(404).json({ success: false, message: 'No active borrow record found' });

    borrow.status = 'returned';
    borrow.returnDate = new Date();
    await borrow.save();

    const book = await Book.findById(req.params.id);
    book.availableQuantity += 1;
    await book.save();

    res.json({ success: true, message: 'Book returned successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getMyBooks = async (req, res, next) => {
  try {
    const borrows = await Borrow.find({ memberId: req.user._id, status: 'borrowed' }).populate('bookId');
    res.json({ success: true, books: borrows });
  } catch (error) {
    next(error);
  }
};