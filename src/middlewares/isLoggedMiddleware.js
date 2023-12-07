function isLoggedMiddleware(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    const currentPath = req.originalUrl;

    const publicRoutes = ['/login', '/register'];
    if (publicRoutes.includes(currentPath)) {
      return next();
    }

    const privateRoutes = ['/private'];
    if (privateRoutes.includes(currentPath)) {
      return res.redirect('/login');
    }

    return res.redirect('/profile'); 
  }
};


module.exports = isLoggedMiddleware;
