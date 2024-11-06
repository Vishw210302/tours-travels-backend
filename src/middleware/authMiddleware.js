const adminLogin = require("../schema/adminLoginSchema/adminLoginSchema");

const isAuthenticated = async (req, res, next) => {
    try {
        if (req.isAuthenticated() && req.session.adminId) {

            const admin = await adminLogin.findById(req.session.adminId);
            if (admin && admin.email === req.user.email) {
                return next();
            }

        }
        req.session.returnTo = req.originalUrl;
        res.redirect('/');
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.redirect('/');
    }

};

const isNotAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated() || !req.session.adminId) {
        return next();
    }
    res.redirect('/admin');
};

module.exports = {
    isAuthenticated,
    isNotAuthenticated
};