const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
    getAllSongs,
    getSongById,
    createSong,
    updateSong,
    deleteSong,
    searchSongs
} = require('../controllers/songController');

// Public routes
router.get('/', getAllSongs);
router.get('/search', searchSongs);
router.get('/:id', getSongById);

// Protected routes (cần đăng nhập)
router.use(protect);
router.post('/', createSong);
router.put('/:id', updateSong);
router.delete('/:id', deleteSong);

module.exports = router;
