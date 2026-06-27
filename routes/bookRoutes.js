const express = require('express');
const router = express.Router();
const { addBook, getAllBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController');
const { borrowBook, returnBook } = require('../controllers/memberController');
const protect = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

router.get('/', protect, getAllBooks);
router.get('/:id', protect, getBookById);
router.post('/', protect, role('librarian'), addBook);
router.put('/:id', protect, role('librarian'), updateBook);
router.delete('/:id', protect, role('librarian'), deleteBook);
router.post('/:id/borrow', protect, role('member'), borrowBook);
router.post('/:id/return', protect, role('member'), returnBook);

module.exports = router;