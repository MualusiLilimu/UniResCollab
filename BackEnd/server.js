const express = require('express');
const path =  require('path');
const userRouter = require('./Routes/userRoutes');
const app = express();
const PORT = 4000;

app.use(express.json());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'..','FrontEnd','views'));
app.use('/',userRouter);

app.listen(PORT,function(){
    console.log(`listening to port ${PORT}`);
});