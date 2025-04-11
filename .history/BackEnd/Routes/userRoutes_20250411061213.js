const express=require('express')

const controller=require('../Controllers/userController')

const router = express.Router();

router.get('/welcome',controller.welcome)

router.get('/Admin/Home',controller.AdminHome)

router.get('/Researcher/Home',controller.ResearcherHome)

router.get('/Reviewer/Home',

router.get('/login',function(req,res){
    res.render('login.ejs');
});

router.get('/register',function(req,res){
    res.render('Register.ejs');
});

module.exports = router;



