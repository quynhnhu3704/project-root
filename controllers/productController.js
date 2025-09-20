const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

module.exports.index = async (req, res) => {
  const { supplier, q } = req.query;
  const filter = {};
  if(supplier) filter.supplier = supplier;
  if(q) filter.name = { $regex: q, $options: 'i' };
  const products = await Product.find(filter).populate('supplier');
  const suppliers = await Supplier.find();
  res.render('products/index', { products, suppliers, filterQ: q || '' });
};

module.exports.newForm = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('products/form', { product: {}, suppliers });
};

module.exports.create = async (req, res) => {
  const { name, price, quantity, supplier, sku } = req.body;
  await Product.create({ name, price, quantity, supplier: supplier || null, sku });
  res.redirect('/products');
};

module.exports.editForm = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const suppliers = await Supplier.find();
  res.render('products/form', { product, suppliers });
};

module.exports.update = async (req, res) => {
  const { name, price, quantity, supplier, sku } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { name, price, quantity, supplier: supplier || null, sku });
  res.redirect('/products');
};

module.exports.delete = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
};
