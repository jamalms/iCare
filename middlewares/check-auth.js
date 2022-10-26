function checkAuthStatus(req, res, next) {
    const uid = req.session.uid;

    if (!uid) {
        return next();
    }

    res.locals.uid = uid;
    res.locals.isAuth = true; 
    res.locals.isAdmin = req.session.isAdmin;
    res.locals.isDoctor = req.session.isDoctor;
    next();
}

module.exports = checkAuthStatus;