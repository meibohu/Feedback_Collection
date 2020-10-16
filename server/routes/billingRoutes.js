const keys = require('../config/keys');
//use in server, help us take the token got from front end and exchange it for an actual charge.
const stripe = require('stripe')(keys.stripeSecretKey);   //secret key
const requireLogin = require('../middlewares/requireLogin');

//watch post requests
module.exports = (app) => {
  app.post('/api/stripe', requireLogin, async(req, res) => {      //the request contains the actual token(id)

    // if(!req.user){
    //   return res.status(401).send({error: ''})
    // }

    //create a charge
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id,
    });

    req.user.credits += 5;
    const user = await req.user.save();
    // console.log(charge);
    res.send(user);
  });
};
