const _ = require('lodash');    //iterator
const { Path } = require('path-parser');
const { URL } = require('url');   //we use URL function in url

const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');    //mongoose model class

module.exports = app => {    //the user is authenticated: requireLogin
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id}).select({      //do not want to include recipients into survey
      recipients: false,
    });

    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');   //extract surveyId and choices as matcher

    _.chain(req.body).map(({email, url}) => {
        const match = p.test(new URL(url).pathname); //extract and test
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {     //use surveyid, email, choice in event
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();

    // console.log(events);
    res.send({});

////原始
    // // const events = _.map(req.body, (event) => {         //email, url in event
    // const events = _.map(req.body, ({email, url}) => {
    //   // const pathname = new URL(event.url).pathname;    //extract path
    //   const pathname = new URL(url).pathname;    //extract path
    //
    //   // console.log(p.test(pathname));
    //   const match = p.test(pathname);
    //   if(match){
    //     return {
    //       // email: event.email,
    //       email,
    //       surveyId: match.surveyId,
    //       choice: match.choice
    //     };
    //   }
    // });
    // // console.log(events);
    // const compactEvents = _.compact(events);
    // const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId'); //no duplicate email and id
    //
    // console.log(uniqueEvents);
    //
    // res.send({});

  });

  //1. log in 2. at least one credit
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
      const { title, subject, body, recipients } = req.body;     //pass along all different properties

      //use model class to create a new instance survey
      const survey = new Survey({
        //titile: title,     //identical it can be ignored.
        title,
        subject,
        body,
        // recipients: recipients.split(',').map(email => {return {email: email }}),    //only care about email. return object email with value email
        recipients: recipients.split(',').map((email) => ({ email: email.trim() })),   //create an object with the value of actual email address.
        _user: req.user.id,    //generated automatically
        dateSent: Date.now(),
      });
      // Great place to send an email!

      //Greate place to send email:
      //How?   pass data: the entire survey object, template(html)
      const mailer = new Mailer(survey, surveyTemplate(survey));
      try {
        await mailer.send();
        await survey.save();    //in database
        req.user.credits -= 1;
        const user = await req.user.save();

        res.send(user);
      } catch (err) {
        res.status(422).send(err);
      }
  });
};
