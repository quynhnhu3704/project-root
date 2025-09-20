const express = require('express');
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');
const auth = require('../middleware/auth');
const router = express.Router();

// List products
router.get('/', auth, async (req, res) => {
  const products = await Product.find().populate('supplier');
  res.render('products/index', { products });
});

// Add product form
router.get('/form', auth, async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('products/form', { product: {}, suppliers });
});

// Create product
router.post('/', auth, async (req, res) => {
  await Product.create(req.body);
  res.redirect('/products');
});

// Edit form
router.get('/edit/:id', auth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  const suppliers = await Supplier.find();
  res.render('products/form', { product, suppliers });
});

// Update
router.post('/edit/:id', auth, async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/products');
});

// Delete
router.post('/delete/:id', auth, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
});

module.exports = router;
