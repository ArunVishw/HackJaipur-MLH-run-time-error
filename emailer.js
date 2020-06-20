var nodemailer = require('nodemailer');

function email(email_receiver,subject_,text_)
{
var admin_email='drishtibeohar25@gmail.com'
var admin_password='Hackinjaipur21@gmail'
var nm=name_reciver
var er=email_reciver
var s=subject_
var t=text_
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: admin_email,
    pass: admin_password
  }
});


var mailOptions = {
  from: 'beohardrishti25@gmail.com',
  to: er,
  subject: s_,
  text: t_      
};


transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
return ;
}