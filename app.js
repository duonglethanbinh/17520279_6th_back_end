const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

//Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());

//connect to database
mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(err);
    });

//Import Routes
const reviewsRoute = require('./routes/reviews');
const contactRoute = require('./routes/contact');

app.use('/reviews', reviewsRoute);
app.use('/contact', contactRoute);

//Routes
app.get('/', function (req, res) {
    res.send('We are at server')
})

module.exports = app;