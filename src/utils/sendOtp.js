
const nodemailer = require('nodemailer');
const OTP = require('../schema/adminLoginSchema/adminOtpSchema');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vishwprajapaticodecrewinfotech@gmail.com',
        pass: 'gugb cdcg musq uyre'
    }
});

exports.sendOTP = async (email) => {

    await OTP.deleteMany({ email });

    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

    const mailOptions = {
      from: 'vishwprajapaticodecrewinfotech@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${generatedOTP}. It is valid for 1 minute.`,
    };
  
    await transporter.sendMail(mailOptions);
    
    const otpDoc = await OTP.create({
        email,
        otp: generatedOTP
    })
    
}
