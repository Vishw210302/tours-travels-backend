const adminLogin = require("../schema/adminLoginSchema/adminLoginSchema");
const OTP = require("../schema/adminLoginSchema/adminOtpSchema");
const employees = require("../schema/allEmployeeSchema/allEmployeeSchema");
const genarateToken = require("../utils/genarateToken");
const { sendOTP } = require("../utils/sendOtp");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

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

                var token = await genarateToken(existingAdmin, 'admin')
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

        const employee = await employees.findOne({ employeeEmail }).populate('employeeRole');
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const isPasswordValid = await bcrypt.compare(employeePassword, employee.employeePassword);
        if (!isPasswordValid) {
            return res.render('admin-panel/404page/404page')
        }

        const token = await genarateToken(employee, 'employee', employeePassword)

        req.session.user = employee
        res.cookie('token', token)

        res.redirect("/admin")
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

authController.getForgotPassword = async (req, res) => {
    try {
        res.render("admin-panel/forgotPasswordPage/forgotPasswordPage")
    } catch (error) {
        console.log("error", error)
    }
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'meetnode@gmail.com',
        pass: 'wuafmrngtspmdiwo'
    }
});

authController.OTPSendEmail = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await employees.findOne({ employeeEmail: email });

        if (!user) {
            return res.render('admin-panel/404page/404page')
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        const mailOptions = {
            from: 'meetnode@gmail.com',
            to: email,
            subject: 'Your OTP for Password Reset',
            text: `Your OTP is ${otp}. It is valid for 10 minutes.`
        };

        await transporter.sendMail(mailOptions);
        res.render('admin-panel/forgotPasswordPage/checkOTPResetPassword', { userData: user })
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).send('Failed to send OTP.');
    }
};

authController.verifyOTPPassword = async (req, res) => {
    try {
        const { userId, otp } = req.body
        const response = await employees.findById(userId)
        if (otp == response.otp) {
            res.render('admin-panel/forgotPasswordPage/resetPassword', { userId: userId })
        } else {
            res.render('admin-panel/404page/404page')
        }
    } catch (error) {
        console.log("error", error)
    }
};

authController.resetPassword = async (req, res) => {
    try {
        const { userId, newPassword, confirmPassword } = req.body;

        if (!userId || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedEmployee = await employees.findByIdAndUpdate(
            userId,
            { employeePassword: hashedPassword },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: "User not found." });
        }
        res.redirect('/')
    } catch (error) {
        console.error("Error resetting password:", error);
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