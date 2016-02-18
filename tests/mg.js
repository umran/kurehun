var api_key = 'key-57bce99be10b4b671389efffdf2e0c25';
var domain = 'mg.kurehun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
var data = {
  from: '<invitations@mg.kurehun.org>',
  to: 'umran.hussein@gmail.com',
  subject: 'Invitation to join Kurehun',
  text: 'Hi there! You have been invited to join Kurehun. Please click on the link below to create your account now. The link will expire on 29/07/2016. As usual, do not reply to this automated email. If you have any queries about Kurehun, please direct them to queries@kurehun.org. Cheers and have a good one!'
};
 
mailgun.messages().send(data, function (error, body) {
  console.log(body);
});