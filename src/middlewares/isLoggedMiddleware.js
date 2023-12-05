function isLoggedMiddleware(req, res, next) {
    if (!req.session.user || !req.session) {
        return res.redirect('/user/login');
    }
    next();
}

module.exports = isLoggedMiddleware;