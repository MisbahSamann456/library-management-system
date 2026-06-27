const express = require('express');
const router = express.Router();
const { getAllMembers, deleteMember, getMyBooks } = require('../controllers/memberController');
const protect = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

router.get('/', protect, role('librarian'), getAllMembers);
router.delete('/:id', protect, role('librarian'), deleteMember);
router.get('/me/books', protect, role('member'), getMyBooks);

module.exports = router;