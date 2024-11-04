const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config();

const debug = require('debug')('app:oauth');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

const strategyConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.baseUrl}/auth/google/callback`,
    passReqToCallback: true
};

debug('Strategy config:', {
    ...strategyConfig,
    clientSecret: '***' // Hide secret in logs
});

passport.use(new GoogleStrategy(
    strategyConfig,
    async (request, accessToken, refreshToken, profile, done) => {
        try {
            debug('Received profile:', profile.id);
            return done(null, profile);
        } catch (error) {
            debug('Error in Google Strategy:', error);
            return done(error, null);
        }
    }
));