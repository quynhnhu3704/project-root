const Supplier = require('../models/Supplier');

// List suppliers
exports.list = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('suppliers/index', { suppliers });
};

// GET form
exports.getForm = async (req, res) => {
  const supplier = req.params.id ? await Supplier.findById(req.params.id) : {};
  res.render('suppliers/form', { supplier });
};

// POST create or update
exports.save = async (req, res) => {
  if (req.params.id) {
    await Supplier.findByIdAndUpdate(req.params.id, req.body);
  } else {
    await Supplier.create(req.body);
  }
  res.redirect('/suppliers');
};

// POST delete
exports.delete = async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.redirect('/suppliers');
};
