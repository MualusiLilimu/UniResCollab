const express=require('express')

const app=express()

app.listen(3000,(err,res)=>{
    if(err){
        console.log("Encounted an error");
    }
})