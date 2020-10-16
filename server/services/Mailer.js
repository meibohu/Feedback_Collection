//Export something
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;     //helper object
const keys = require('../config/keys');


//we can reuse Mailer in the future:
class Mailer extends helper.Mail {    //provided by sendgrid library
  //do some setup
  constructor({ subject, recipients }, content){  //an object with subject and recipients properties, html string
    super();

    //property
    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('wendyhu9966@gmail.com');    //no reply
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);     //注意

    this.addContent(this.body);     //helper.Mail has this property
    this.addClickTracking();
    this.addRecipients();
  }

  formatAddresses(recipients){
    return recipients.map(({ email }) => {
        return new helper.Email(email);    //use helper.Mail property
    });
  }
  addClickTracking(){    //this is how sendGrid works.
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

//take the list of recipients into mailer
  addRecipients(){
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);   //add into personalize object
    });
    this.addPersonalization(personalize);    //add entire personalize into Mailer
  }

  //take this mailer and send to people:
  async send() {
    const request = this.sgApi.emptyRequest({   //want to send off
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });
    const response = await this.sgApi.API(request);
    return response;
  }
}
module.exports = Mailer;
