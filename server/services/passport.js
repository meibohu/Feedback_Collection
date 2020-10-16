const passport = require('passport');  //how to handle authentication.
const GoogleStrategy = require('passport-google-oauth20').Strategy;   //only care about Strategy property
// const keys = require('./config/keys');
const keys = require('../config/keys');
const mongoose = require('mongoose');


const User = mongoose.model('users');

//cookie-based: serialize and deserialize
//This user is we just pulled out of the database two secondes ago.
passport.serializeUser((user, done) => {
  done(null, user.id);   //first arg is error we don't expect. But user.id is not profile.id.
});

passport.deserializeUser((id, done) => {
  User.findById(id)    //query
    .then(user => {
      done(null, user);
    });
});

//use: how to authenticate with specific service. //new instance, pass in some configuration:
//concole.developers.google.com
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClentID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',    //coming back from google that we need to handle user properly
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if(existingUser) {
        return done(null, existingUser); //we already have a record with the given profile ID.
      }
        //we don't have a user record with this ID, make a new record
      const user = await new User({ googleId: profile.id }).save();      //create new instance of a User and successfully save in database
      done(null, user);    //promise callback
    }
    // (accessToken, refreshToken, profile, done) => {     //callback function: when we come back to server, we should see logs.
    //   // console.log('access token', accessToken);
    //   // console.log('refresh token', refreshToken);
    //   // console.log('profile', profile);
    //
    //   //promise asynchronous
    //   User.findOne({ googleId: profile.id })
    //     .then((existingUser) => {
    //       if(existingUser) {
    //         //we already have a record with the given profile ID.
    //         done(null, existingUser);
    //       } else{
    //         //we don't have a user record with this ID, make a new record
    //         new User({ googleId: profile.id }).save()      //create new instance of a User and successfully save in database
    //           .then(user => done(null, user));    //promise callback
    //       }
    //     });
    // }
  )
);

//not export to some other locations
