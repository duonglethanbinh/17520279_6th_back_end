const mongoose = require('mongoose');

const Reviewscontent = mongoose.Schema({
    name: String,
    image: String
});

module.exports = mongoose.model('places', Reviewscontent);