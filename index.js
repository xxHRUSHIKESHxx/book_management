const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();

app.use(bodyParser.json());

// Connect to MongoDB 
mongoose.connect('mongodb://0.0.0.0:27017/book-api')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("server started")
});
