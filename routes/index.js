const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');
const Product = require('../models/Product');

/* GET home page */
router.get('/', async (req, res) => {
  const suppliers = await Supplier.find();
  const products = await Product.find().populate('supplier');
  res.render('index', { userId: req.session.userId, suppliers, products });
});

module.exports = router;
