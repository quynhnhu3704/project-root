const express = require('express');
const Supplier = require('../models/Supplier');
const auth = require('../middleware/auth');
const router = express.Router();

// List suppliers
router.get('/', auth, async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('suppliers/index', { suppliers });
});

// Add supplier form
router.get('/form', auth, (req, res) => res.render('suppliers/form', { supplier: {} }));

// Create supplier
router.post('/', auth, async (req, res) => {
  await Supplier.create(req.body);
  res.redirect('/suppliers');
});

// Edit form
router.get('/edit/:id', auth, async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  res.render('suppliers/form', { supplier });
});

// Update
router.post('/edit/:id', auth, async (req, res) => {
  await Supplier.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/suppliers');
});

// Delete
router.post('/delete/:id', auth, async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.redirect('/suppliers');
});

module.exports = router;
