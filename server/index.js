const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');    //use passport to keep track of user session.
// const passportConfig = require('./services/passport');   //not assigh something

require('./models/User');   //before passport, order is important
require('./models/Survey');
require('./services/passport');
// const authRoutes = require('./routes/authRoutes');

mongoose.connect(keys.mongoURI);

const app = express();   //a running express app

//4 middleware

app.use(bodyParser.json());
app.use(
  cookieSession({   //manage cookies
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
  })
);

//tell passport it should make use of cookies to handle authentication:
app.use(passport.initialize());   //initialize passport
app.use(passport.session());    //login session using cookies

// authRoutes(app);   not export
//Finally becomes:
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//when in production env when in Heroku:
if(process.env.NODE_ENV === 'production'){
   //Express will serve up production assets
   //like our main.js file, or main.css file
   //there is no file inside of our client build directory that matches up with what this request is looking for.
   app.use(express.static('client/build'));

   //Express will serve up the index.html file
   //if it doesn't recognize the route.
   const path = require('path');
   app.get('*', (req, res) => {
     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}


/* If you pass 3000 hard-coded to app.listen(), you're always listening on port 3000,
which might be just for you, or not, depending on your requirements and
the requirements of the environment in which you're running your server.
*/
const PORT = process.env.PORT || 5000;
app.listen(PORT);
