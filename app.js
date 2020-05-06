const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


//Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());

//Import Routes
const placesRoute = require('./routes/places');
const contactRoute = require('./routes/contacts');
const blogsRoute = require('./routes/blogs')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/uploads', express.static('uploads'));
app.use('/places', placesRoute);
app.use('/blogs', blogsRoute);
app.use('/contacts', contactRoute);


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

//Routes
app.get('/', function (req, res) {
    res.send('We are at server')
})

module.exports = app;