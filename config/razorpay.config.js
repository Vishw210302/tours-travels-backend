const razorpay = require("razorpay");
const dotenv = require('dotenv');
dotenv.config();

exports.createRazorpayInstance = () => {
    return new razorpay({
        key_id: process.env.key_id,
        key_secret: process.env.key_secret
    });
}