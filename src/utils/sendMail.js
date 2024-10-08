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
    // const templatePath = path.join(__dirname, 'emailTemplate.html'); 
    // let htmlTemplate = fs.readFileSync(templatePath, 'utf-8');

    // const seatList = seats.map(seat => `<li>${seat}</li>`).join('');
    // const emailContent = htmlTemplate.replace('{{seats}}', seatList);

    const mailOptions = {
        from: 'varmaajay182@gmail.com',
        to: to,
        subject: subject,

    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}
