const express=require('express')

const app=express()

const userRoute=require('./Routes/userRoutes')

app.use('/user',userRoute)
app.u

app.use(express.json());



app.listen(3000, (err,res) => {
    if(err){
        console.log("Encounted an error");
    }
    else{
        
        console.log("Connected");

    }
})