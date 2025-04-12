const passport = require('passport');
const { OIDCStrategy } = require('passport-azure-ad'); 
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

passport.use(new OIDCStrategy({
  identityMetadata: 'https://login.microsoftonline.com/common/.well-known/openid-configuration',
  clientID: process.env.MICROSOFT_CLIENT_ID,
  clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
  responseType: 'code',
  responseMode: 'query',
  redirectUrl: 'http://localhost:4000/auth/microsoft/callback',
  allowHttpForRedirectUrl: true,
  passReqToCallback: false,
}, function(iss, sub, profile, accessToken, refreshToken, done) {
  return done(null, profile);
}));

