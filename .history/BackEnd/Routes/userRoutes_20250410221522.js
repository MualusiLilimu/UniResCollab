const express=require('express')
const router=express.Router()
const controller=require('../Controllers/userController')


router.get('/', controller.get);
router.get('/user/Details',controller.get)




module.exports=router