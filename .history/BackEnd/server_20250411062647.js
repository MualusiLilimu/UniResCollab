const express = require('express');
const path = require('path');
app.use(express.urlencoded({ extended: true })); // For parsing form data


const app = express();

const userRoute = require('./Routes/userRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'FrontEnd', 'views'));

app.use(express.json());

// Use routes
app.use('/', userRoute);

// Start the server
app.listen(3000, (err) => {
    if (err) {
        console.log("Error starting server");
    } else {
        console.log("Connected");
    }
});
