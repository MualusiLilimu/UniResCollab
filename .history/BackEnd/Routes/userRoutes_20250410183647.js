const express=require('express')
const router=express.Router()

const controller=require

router.post('/', (req,res) => {
    res.send("You are created a user")

});


module.exports=router