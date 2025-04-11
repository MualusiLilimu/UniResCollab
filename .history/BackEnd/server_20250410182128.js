const express=require('express')

const app=express()
const userRoute=requ

app.listen(3000,(err,res)=>{
    if(err){
        console.log("Encounted an error");
    }
    else{
        console.log("Connected");
    }
})