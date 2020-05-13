const mongoose = require('mongoose');

const Commentcontent = mongoose.Schema({
    name: String,
    title: String,
    content: String,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('blogs', Commentcontent);