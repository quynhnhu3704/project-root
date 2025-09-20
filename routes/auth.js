const express = require('express');
const User = require('../models/User');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           example: "user1"
 *         password:
 *           type: string
 *           example: "123456"
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

// GET register form
router.get('/register', (req, res) => {
  res.render('register', { 
    title: 'Register', 
    error: null, 
    success: null,
    userId: req.session.userId || null   // ← thêm dòng này
  });
});

// POST register
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;
    const user = new User({ username, password, email, phone });
    await user.save();
    res.redirect('/auth/login?success=User registered successfully');
  } catch (error) {
    res.render('register', { 
      title: 'Register', 
      error: error.message, 
      success: null,
      userId: req.session.userId || null  // ← thêm dòng này
    });
  }
});

// GET login
router.get('/login', (req, res) => {
  res.render('login', { 
    title: 'Login', 
    error: null, 
    success: req.query.success || null,
    userId: req.session.userId || null  // ← thêm dòng này
  });
});

// POST login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.render('login', { 
      title: 'Login', 
      error: 'Invalid credentials', 
      success: null,
      userId: req.session.userId || null  // ← thêm dòng này
    });
  }
  req.session.userId = user._id;
  res.redirect('/');
});

// POST logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    res.clearCookie('sid');
    res.redirect('/auth/login');
  });
});
