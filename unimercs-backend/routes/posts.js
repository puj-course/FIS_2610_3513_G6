const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');
const Post    = require('../models/Post');
const protect = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// GET /api/posts  — todos los posts (feed)
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    const filter = {};
    if (category && category !== 'all') filter.category = category;
    if (search) filter.title = { $regex: search, $options: 'i' };
    const posts = await Post.find(filter).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/posts  — crear post (requiere login)
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { title, category, condition, price } = req.body;
    if (!title || !category || !price)
      return res.status(400).json({ message: 'Faltan campos obligatorios' });

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const post = await Post.create({
      sellerId:    req.user.id,
      sellerName:  req.user.name,
      sellerEmail: req.user.email,
      title, category, condition,
      price: Number(price),
      imageUrl
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/posts/:id  — editar (solo el dueño)
router.put('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'No encontrado' });
    if (String(post.sellerId) !== req.user.id)
      return res.status(403).json({ message: 'No autorizado' });

    const { title, category, condition, price } = req.body;
    Object.assign(post, { title, category, condition, price: Number(price) });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/posts/:id  — eliminar (solo el dueño)
router.delete('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'No encontrado' });
    if (String(post.sellerId) !== req.user.id)
      return res.status(403).json({ message: 'No autorizado' });

    await post.deleteOne();
    res.json({ message: 'Eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;