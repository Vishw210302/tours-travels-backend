const multer = require('multer');
const path = require('path');

const storage = (location = '') => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, `../public/uploads${location}`));
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });
}
const upload = (location) => { 
try {
    return multer({ storage: storage(location) }) 
} catch (error) {
    console.log(error,"ErrorError")
}
}

module.exports = { upload };