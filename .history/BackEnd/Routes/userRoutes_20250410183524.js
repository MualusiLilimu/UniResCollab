const express=require('express')
const router=express.Router()

router.post('/', (req,res) =>{
    res.send("You are created a user")

});


module.exports=router