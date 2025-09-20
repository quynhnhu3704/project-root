const Supplier = require('../models/Supplier');

module.exports.index = async (req, res) => {
  const suppliers = await Supplier.find({});
  res.render('suppliers/index', { suppliers });
};

module.exports.newForm = (req, res) => {
  res.render('suppliers/form', { supplier: {} });
};

module.exports.create = async (req, res) => {
  const { name, address, phone } = req.body;
  await Supplier.create({ name, address, phone });
  res.redirect('/suppliers');
};

module.exports.editForm = async (req, res) => {
  const sup = await Supplier.findById(req.params.id);
  res.render('suppliers/form', { supplier: sup });
};

module.exports.update = async (req, res) => {
  const { name, address, phone } = req.body;
  await Supplier.findByIdAndUpdate(req.params.id, { name, address, phone });
  res.redirect('/suppliers');
};

module.exports.delete = async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.redirect('/suppliers');
};
