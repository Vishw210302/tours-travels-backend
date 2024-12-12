const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set("strictQuery", false);

console.log("Mongo URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 70000,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB:", error);
    });

module.exports = mongoose;