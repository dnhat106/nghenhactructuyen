const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');

// Public routes
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

// Protected routes (cần đăng nhập)
router.use(protect);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
