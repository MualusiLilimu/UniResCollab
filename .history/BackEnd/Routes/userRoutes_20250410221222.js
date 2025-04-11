const express=require('express')
const router=express.Router()
const controller=require('../Controllers/userController')


router.get('/', controller.get);
router.get('',controller.g)




module.exports=router