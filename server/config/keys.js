//figure out what set of credentials to return, whether or not we are running in a production environment.
if( process.env.NODE_ENV === 'production'){
  //we are in production - return the prod set of keys
  module.exports = require('./prod');
} else{  //local machine
  //we are in development - return the dev keys.
  module.exports = require('./dev');
}
