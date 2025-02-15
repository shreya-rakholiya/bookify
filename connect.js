require('dotenv').config();
const mongoose = require('mongoose');

console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB via Mongoose'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
