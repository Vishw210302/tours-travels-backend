const mongoose = require('mongoose');

const adminOtpSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true 
  },
  otp: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now, 
    expires: 60 
  }
});

const OTP = mongoose.model('OTP', adminOtpSchema);

module.exports = OTP;
