const mongoose = require('mongoose');

const Reviewscontent = mongoose.Schema({
    name: String,
    email: String,
    message: String
});
module.exports = mongoose.model('contacts', Reviewscontent)