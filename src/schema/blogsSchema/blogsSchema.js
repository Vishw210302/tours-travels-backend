const mongoose = require('mongoose');

const blogsSchema = new mongoose.Schema({
    blogsName: {
        type: String,
        required: true,
    },
    blogsDescription: {
        type: String,
        required: true,
    },
    blogImage: {
        type: String,
        required: true,
    },
    blogType: {
        type: String,
        required: true,
    },
    blogAuthor: {
        type: String,
        required: true,
    },
    blogGallery: {
        type: [String],
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    deletedAt: {
        type: Date,
        default: null,
    }
});

const blogs = mongoose.model('blogs', blogsSchema);

module.exports = blogs;