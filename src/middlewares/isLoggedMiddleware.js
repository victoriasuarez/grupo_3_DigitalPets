function isLoggedMiddleware(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    const currentPath = req.originalUrl;

    const publicRoutes = ['/users/login', '/users/register', '/'];
    if (publicRoutes.includes(currentPath)) {
      return next();
    }

    // const privateRoutes = ['/private'];
    // if (privateRoutes.includes(currentPath)) {
    //   return res.redirect('/login');
    // }

    return res.redirect('/users/login');
  }
};


module.exports = isLoggedMiddleware;
