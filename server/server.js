const express = require('express');
const mongoose = require('mongoose');
const countryRoutes = require('./routes/countries');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://bilguun:123@cluster0.1rjoki5.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', countryRoutes); // Assuming your routes are in a file called 'countries.js'

app.listen(5000, () => {
    console.log('Server started on port 3000');
});
