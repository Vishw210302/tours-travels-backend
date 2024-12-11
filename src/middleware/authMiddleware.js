const adminLogin = require("../schema/adminLoginSchema/adminLoginSchema");

const jwt = require('jsonwebtoken');
const { roleAndPermission } = require("../utils/roleAndPermission");
require('dotenv').config();

let isAuthenticated = (req, res, next) => {

    try {
        const token = req.cookies.token;
        if (!token || token == undefined) {
            return res.redirect("/");
        }


        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {

            if (err) {
                return res.redirect("/");
            }

            req.user = decoded;
            const permission= await roleAndPermission(req.user.id)
            res.locals.hasPermission = permission
            next();
        });
    } catch (err) {
        console.log("While login middlware error: " + err.message)
    }

}

const isTokenExpired = (decodedToken) => {
    if (!decodedToken || !decodedToken?.exp) {
        return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken?.exp < currentTime;
};


const isNotAuthenticated = (req, res, next) => {

    const token = req.cookies?.token;
    const decodedToken = token ? jwt.decode(token) : null;

    if (!token || isTokenExpired(decodedToken)) {
        return next();
    }

    res.redirect('/admin');
};

module.exports = {
    isAuthenticated,
    isNotAuthenticated
};