const User = require('../models/User');

// ===== REGISTER =====
module.exports.showRegister = (req, res) => {
  res.render('auth/register', { error: '' });
};

module.exports.register = async (req, res) => {
  const { username, password, email, phone } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.render('auth/register', { error: 'Username already exists!' });

    const user = new User({ username, password, email, phone });
    await user.save();
    req.session.user = { id: user._id, username: user.username };
    res.redirect('/');
  } catch (e) {
    res.render('auth/register', { error: 'Something went wrong' });
  }
};

// ===== LOGIN =====
module.exports.showLogin = (req, res) => {
  res.render('auth/login', { error: '' });
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.render('auth/login', { error: 'Invalid credentials' });
  const ok = await user.comparePassword(password);
  if (!ok) return res.render('auth/login', { error: 'Invalid credentials' });

  req.session.user = { id: user._id, username: user.username };
  const redirectTo = req.session.returnTo || '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);
};

// ===== LOGOUT =====
module.exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/'));
};

// ===== FORGOT PASSWORD =====
module.exports.showForgot = (req, res) => {
  res.render('auth/forgot', { error: '', success: '' });
};

module.exports.forgot = async (req, res) => {
  const { username, email } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.render('auth/forgot', { error: 'No account found', success: '' });

  if (user.email !== email) {
    return res.render('auth/forgot', { error: 'Email does not match username', success: '' });
  }

  // Nếu username + email đúng → render form reset password
  res.render('auth/reset', { username, error: '', success: '' });
};

// ===== RESET PASSWORD =====
module.exports.resetPassword = async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.render('auth/reset', { username, error: 'Passwords do not match', success: '' });
  }

  const user = await User.findOne({ username });
  if (!user) return res.render('auth/reset', { username, error: 'User not found', success: '' });

  user.password = password;
  await user.save();

  res.render('auth/reset', { username, error: '', success: 'Password successfully updated! You can now login.' });
};
