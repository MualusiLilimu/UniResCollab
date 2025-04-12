const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const path = require('path');
const OAuthUser = require('../Models/userModel');
require('dotenv').config({ path: path.join(__dirname, '..','..', '.env') });

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    const newUser = {
      provider: 'google',
      providerId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value
    };
  
    try {
      let user = await OAuthUser.findOne({ provider: 'google', providerId: profile.id });
  
      if (!user) {
        user = await OAuthUser.create(newUser);
      }
  
      return done(null, user);
    } catch (err) {
      console.error(err);
      return done(err, null);
    }
  }
));
