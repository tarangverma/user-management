const express = require('express');
const { registerUser, loginUser, getUsers, updateUserDetails, deleteUserAccount, createNewUser } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/users', authenticateToken, getUsers);
router.post('/users', authenticateToken, createNewUser);
router.put('/users/:id', authenticateToken, updateUserDetails);
router.delete('/users/:id', authenticateToken, deleteUserAccount);

module.exports = router;
