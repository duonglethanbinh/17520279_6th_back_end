const mongoose = require('mongoose');

const Reviewscontent = mongoose.Schema({
    name: String,
    image: String,
    place_id: String
});

module.exports = mongoose.model('reviews', Reviewscontent);