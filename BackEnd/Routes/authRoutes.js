const express = require('express');
const passport = require('passport');
const authController = require('../Controllers/authController');

const router = express.Router();

// Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), authController.googleCallback);

// GitHub
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), authController.githubCallback);

// Microsoft
router.get('/microsoft', passport.authenticate('azuread-openidconnect', { failureRedirect: '/login' }));
router.get('/microsoft/callback', passport.authenticate('azuread-openidconnect', { failureRedirect: '/login' }), authController.microsoftCallback);

// Login Page
router.get('/login', authController.loginPage);

module.exports = router;
