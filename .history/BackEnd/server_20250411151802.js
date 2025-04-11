const express = require('express');
const path = require('path');
const DB = require('./config/database');


const app = express();

const userRoute = require('./Routes/userRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'FrontEnd', 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoute);

const server=async ()=>{
    try{
app.listen(3000, (err) => {
    if (err) {
        console.log("Error starting server");
    } else {
        console.log("Connected");
    }
});}catch(err){
    
}
};
