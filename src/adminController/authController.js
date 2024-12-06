const adminLogin = require("../schema/adminLoginSchema/adminLoginSchema");
const OTP = require("../schema/adminLoginSchema/adminOtpSchema");
const employees = require("../schema/allEmployeeSchema/allEmployeeSchema");
const genarateToken = require("../utils/genarateToken");
const { sendOTP } = require("../utils/sendOtp");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

const authController = {};

authController.loginPage = async (req, res) => {
    try {
        res.render("admin-panel/authPage/loginPage")
    } catch (error) {
        console.log("error", error)
    }
}

authController.successGoogleLogin = async (req, res) => {

    try {

        if (!req.user) {
            console.log('No user found in session');
            return res.redirect('/failure');
        }

        const existingAdmin = await adminLogin.findOne();

        if (existingAdmin) {

            if (existingAdmin.email === req.user.email) {

                var token = genarateToken(existingAdmin,'admin')
                res.cookie('token', token)
                return res.redirect('/admin');

            } else {
                res.clearCookie('connect.sid');
                return res.redirect('/');
            }

        }

        const admin = await adminLogin.create({
            email: req.user.email,
            name: req.user.displayName
        })

        req.session.adminId = admin._id;

        res.redirect('/admin')

    } catch (error) {
        console.error('Login error:', error);
        res.redirect('/failure');
    }

}

authController.employeeLogin = async (req, res) => {
    try {
        const { employeeEmail, employeePassword } = req.body;

        if (!employeeEmail || !employeePassword) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const employee = await employees.findOne({ employeeEmail });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const isPasswordValid = await bcrypt.compare(employeePassword, employee.employeePassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = genarateToken(employee, 'employee')
        res.cookie('token', token)

        res.redirect("/admin")
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


authController.failureGoogleLogin = (req, res) => {
    console.log('Authentication failed');
    res.redirect('/')
}

authController.getAdminEmail = async (req, res) => {
    try {
        const adminEmail = await adminLogin.findOne();

        res.json({
            status: true,
            admin: adminEmail
        })

    } catch (err) {
        console.error('Get admin error :', err);
    }
}

authController.getAdminEmailOtp = async (req, res) => {

    const email = req.query.email;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        await sendOTP(email);
        res.status(200).json({ message: 'OTP sent to your email' });

    } catch (err) {
        console.error('Get admin error :', err);
    }
}

authController.verifyOTP = async (req, res) => {

    const email = req.query.email;
    const enteredOTP = req.query.otp;

    console.log(enteredOTP, 'enteredOTPenteredOTPenteredOTPenteredOTPenteredOTP');

    if (!email || !enteredOTP) {
        return res.status(400).json({ error: 'Email and OTP are required' });
    }

    try {

        const otpRecord = await OTP.findOne({ email });

        if (otpRecord.otp === enteredOTP) {

            await adminLogin.deleteMany({});

            res.json({ status: true, message: 'OTP verified successfully' });
        } else {
            res.json({ status: false, message: 'Invalid OTP' });
        }

    } catch (err) {
        console.error('Error verifying OTP:', err);
        res.status(500).json({ error: 'Server error while verifying OTP' });
    }
}

authController.logout = async (req, res) => {
    try {
        res.clearCookie('connect.sid');
        res.clearCookie('token');
        res.redirect("/");
    } catch (error) {
        console.error('Logout error:', error);
        res.redirect('/failure');
    }
}

module.exports = authController;