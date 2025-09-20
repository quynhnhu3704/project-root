const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

// List products
exports.list = async (req, res) => {
  const search = req.query.search || '';
  const products = await Product.find({ name: { $regex: search, $options: 'i' } }).populate('supplier');
  res.render('products/index', { products });
};

// GET form
exports.getForm = async (req, res) => {
  const product = req.params.id ? await Product.findById(req.params.id) : {};
  const suppliers = await Supplier.find();
  res.render('products/form', { product, suppliers });
};

// POST create or update
exports.save = async (req, res) => {
  if (req.params.id) {
    await Product.findByIdAndUpdate(req.params.id, req.body);
  } else {
    await Product.create(req.body);
  }
  res.redirect('/products');
};

// POST delete
exports.delete = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
};
