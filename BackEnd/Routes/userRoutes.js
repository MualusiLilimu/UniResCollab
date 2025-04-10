const express = require('express');
const router = express.Router();

router.get('/welcome',function(req,res){
    res.render('index.ejs');
});

router.get('/Admin/Home',function(req,res){
    res.render('AdminHome.ejs');
});

router.get('/Researcher/Home',function(req,res){
    res.render('ResearcherHome.ejs');
});

router.get('/Reviewer/Home',function(req,res){
    res.render('ReviewerHome.ejs');
});

router.get('/login',function(req,res){
    res.render('login.ejs');
});

router.get('/register',function(req,res){
    res.render('Register.ejs');
});

module.exports = router;