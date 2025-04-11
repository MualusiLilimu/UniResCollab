const express=require('express')

const controller=require('../Controllers/userController')

const router = express.Router();

router.get('/welcome',controller.welcome)

router.get('/Admin/Home',controller.AdminHome)

router.get('/Researcher/Home',controller.ResearcherHome)

router.get('/Reviewer/Home',controller.ReviwerHome)

router.post('/login',controller.login)

router.get('/register',controller.register)


module.exports = router;



