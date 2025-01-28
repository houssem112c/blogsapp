const express = require('express');
const { uploadMiddleware, createBlog, getBlogs, getBlogById, updateBlog, deleteBlog, getMyBlogs } = require('../controllers/blogController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, uploadMiddleware, createBlog);
router.get('/', getBlogs);
router.get('/myblog', authMiddleware, getMyBlogs);
router.get('/:id', getBlogById);
router.put('/:id', authMiddleware, updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

module.exports = router;
