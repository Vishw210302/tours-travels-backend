
const jwt = require('jsonwebtoken')
require('dotenv').config();

const genarateToken = (user, key) => {
  var genaratedToken 
  if(key == 'admin'){
     genaratedToken = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  }else{
    genaratedToken = jwt.sign({ email: user.employeeEmail, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  }
  return genaratedToken
}

module.exports = genarateToken