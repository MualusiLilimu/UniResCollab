const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const path = require('path');
const OAuthUser = require('../Models/userModel');
require('dotenv').config({ path: path.join(__dirname, '..','..', '.env') });

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/auth/github/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    const newUser = {
      provider: 'github',
      providerId: profile.id,
      displayName: profile.displayName,
      username: profile.username,
      email: profile.emails && profile.emails[0] ? profile.emails[0].value : null
    };
  
    try {
      let user = await OAuthUser.findOne({ provider: 'github', providerId: profile.id });
  
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
