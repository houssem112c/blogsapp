const Blog = require('../models/Blog');
const multer = require('multer');
const path = require('path');

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

exports.uploadMiddleware = upload.single('image');

// Create a blog
exports.createBlog = async (req, res) => {
  const { title, content, tags, category } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  const userId = req.user.userId; // Get userId from the authenticated user

  try {
    const blog = new Blog({ 
      title, 
      content, 
      tags, 
      category, 
      image: imagePath, 
      userId  
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMyBlogs = async (req, res) => {
  try {
    const userId = req.user.id; 


    const blogs = await Blog.find({ userId });

    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching blogs' });
  }
};


exports.getBlogs = async (req, res) => {
  const { page = 1, limit = 5, search = '' } = req.query; 
  try {
    const query = search
      ? { title: { $regex: search, $options: 'i' } } 
      : {};

    const blogs = await Blog.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
