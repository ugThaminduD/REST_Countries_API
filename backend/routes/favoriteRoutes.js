const express = require('express');
const { addFavorite, getFavorites, removeFavorite } = require('../controllers/favoriteController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', protect, addFavorite);
router.get('/:userId', protect, getFavorites);
router.post('/remove', protect, removeFavorite);

module.exports = router;