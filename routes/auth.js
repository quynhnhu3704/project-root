const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

// ===== REGISTER =====
router.get('/register', auth.showRegister);
router.post('/register', auth.register);

// ===== LOGIN =====
router.get('/login', auth.showLogin);
router.post('/login', auth.login);

// ===== LOGOUT =====
router.post('/logout', auth.logout);

// ===== FORGOT PASSWORD =====
router.get('/forgot', auth.showForgot);
router.post('/forgot', auth.forgot);

// ===== RESET PASSWORD =====
// Chú ý: form reset gửi username ẩn để xác nhận
router.post('/reset', auth.resetPassword);

module.exports = router;
