
const jwt = require('jsonwebtoken');
const { sendPyamentDetails } = require('./sendMail');
require('dotenv').config();

const genarateToken = async (user, key, pass) => {
  var genaratedToken 
  if(key == 'admin'){
     genaratedToken = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  }else{
    genaratedToken = jwt.sign({ email: user.employeeEmail, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  }

  await sendPyamentDetails(pass, user.employeeEmail)

  return genaratedToken
}

module.exports = genarateToken