const express=require('express')
const router=express.Router()



router.('/', (req,res) => {
    res.send("You are created a user")

});


module.exports=router