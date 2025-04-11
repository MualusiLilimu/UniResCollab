const express=require('express')

const controller=require('../Controllers/userController')

const router = express.Router();

router.get('/welcome',controller.welcome)

router.get('/Admin/Home',controller.AdminHome)

router.get('/Researcher/Home',controller.ResearcherHome)

router.get('/Reviewer/Home',controller.ReviewerHome)

router.get('/login',controller.login)
router.post('/login',controller.loginFill)

router.get('/register',controller.register)
router.post('/register',controller.registerFill)


module.exports = router;



