const mongoose = require('mongoose');

const Commentcontent = mongoose.Schema({
    name: String,
    title: String,
    content: String
});

module.exports = mongoose.model('blogs', Commentcontent);