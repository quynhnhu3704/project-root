module.exports.isLoggedIn = (req, res, next) => {
  if(req.session.user) return next();
  req.session.returnTo = req.originalUrl;
  return res.redirect('/auth/login');
};
