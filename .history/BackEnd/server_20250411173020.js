const express = require('express');
const path = require('path');
const {DB} = require('./config/database');


const app = express();

const userRoute = require('./Routes/userRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'FrontEnd', 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoute);
//changed this to an async because i want to be able to call the database first then wait unt
const server = async () => {
    try {
      await DB();
  
      app.listen(3000, (err) => {
        if (err) {
          console.log("❌ Error starting server:", err);
        } else {
          console.log("🚀 Server started on http://localhost:3000");
        }
      });
  
    } catch (err) {
      console.log("❌ Couldn't connect to database:", err.message);
      
      
    }
  };
  
  server();