const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const employees = require('../schema/allEmployeeSchema/allEmployeeSchema');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'meetnode@gmail.com',
        pass: 'wuafmrngtspmdiwo'
    }
});

exports.sendEmail = async (to, subject) => {

    const mailOptions = {
        from: 'varmaajay182@gmail.com',
        to: to,
        subject: subject,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

exports.setEmployeePasswordEmail = async (empEmail, password) => {
    try {

        const empData = await employees.findOne({ employeeEmail: empEmail }).select('-employeePassword -__v').populate('employeeRole', { roleName: 1 }).lean()
        const data = { ...empData, password }
        const templatePath = path.join(__dirname, '../views/admin-panel/allUsers/employeePasswordReset.ejs');

        const htmlContent = await ejs.renderFile(templatePath, { data });
        const mailOptions = {
            from: 'meetnode@gmail.com',
            to: empEmail,
            subject: 'Set Password',
            html: htmlContent,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};