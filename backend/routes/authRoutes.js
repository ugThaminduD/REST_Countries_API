const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/register', register);
router.post('/login', login);

// Protect route
router.get('/profile', protect, getProfile);


module.exports = router;