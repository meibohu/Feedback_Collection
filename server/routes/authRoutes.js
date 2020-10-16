const passport = require('passport');   //original passport not services's passport.

//not export

module.exports = (app) => {
  //two handlers handle OAuth:
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
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();   //kills the IDs
    // res.send(req.user);
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);   //get access to user, test
    // res.send(req.session);
  });
};
//export this function with arg app
