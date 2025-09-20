const User = require('../models/User');

// GET register
exports.getRegister = (req, res) => {
  res.render('register', { error: null, success: null });
};

// POST register
exports.postRegister = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;
    const user = new User({ username, password, email, phone });
    await user.save();
    res.redirect('/auth/login?success=Registered successfully');
  } catch (err) {
    res.render('register', { error: err.message, success: null });
  }
};

// GET login
exports.getLogin = (req, res) => {
  res.render('login', { error: null, success: req.query.success || null });
};

// POST login
exports.postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.render('login', { error: 'Invalid credentials', success: null });
    }
    req.session.userId = user._id;
    res.cookie('sid', req.sessionID, { httpOnly: true, maxAge: 3600000 });
    res.redirect('/');
  } catch (err) {
    res.render('login', { error: 'Login failed', success: null });
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('sid');
    res.redirect('/auth/login');
  });
};
