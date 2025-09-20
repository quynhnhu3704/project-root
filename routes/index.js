const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

router.get('/', async (req, res) => {
  // show home with products and filters
  const suppliers = await Supplier.find();
  const products = await Product.find({}).populate('supplier');
  res.render('index', { suppliers, products });
});

module.exports = router;
