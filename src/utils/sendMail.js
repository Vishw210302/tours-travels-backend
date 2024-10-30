const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

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
