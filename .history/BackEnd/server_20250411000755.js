const express=require('express')
const path =  require('path');
const app=express()

const userRoute=require('./Routes/userRoutes')
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'..','FrontEnd','views'));
app.use('/',userRoute)


app.use(express.json());



app.listen(3000, (err,res) => {
    if(err){
        console.log("" error");
    }
    else{
        
        console.log("Connected");

    }
})