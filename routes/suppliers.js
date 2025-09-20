const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/supplierController');
const { isLoggedIn } = require('../middleware/auth');

router.get('/', ctrl.index);
router.get('/new', isLoggedIn, ctrl.newForm);
router.post('/', isLoggedIn, ctrl.create);
router.get('/:id/edit', isLoggedIn, ctrl.editForm);
router.put('/:id', isLoggedIn, ctrl.update);
router.delete('/:id', isLoggedIn, ctrl.delete);

module.exports = router;
