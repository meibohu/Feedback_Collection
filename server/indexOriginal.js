const express = require('express');
const passport = require('passport');  //how to handle authentication.
const GoogleStrategy = require('passport-google-oauth20').Strategy;   //only care about Strategy property
const keys = require('./config/keys');


const app = express();   //a running express app

//use: how to authenticate with specific service. //new instance, pass in some configuration:
//concole.developers.google.com
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClentID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',    //coming back from google that we need to handle user properly
  },
  (accessToken, refreshToken, profile, done) => {     //when we come back to server, we should see logs.
    console.log('access token', accessToken);
    console.log('refresh token', refreshToken);
    console.log('profile', profile);
  })
);

//a route handler: localhost:5000/auth/google, involve passport
app.get(
  '/auth/google',
  passport.authenticate('google', {   //use the google Strategy, identify the string google internally.
    scope: ['profile', 'email']
  })
);

//user get callback
//add second route handler, google strategy through passport will handle the information for us.
app.get('/auth/google/callback',
  passport.authenticate('google'));






/* If you pass 3000 hard-coded to app.listen(), you're always listening on port 3000,
which might be just for you, or not, depending on your requirements and
the requirements of the environment in which you're running your server.
*/
const PORT = process.env.PORT || 5000;
app.listen(PORT);
