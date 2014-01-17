
var nodemailer = require("nodemailer");

// create reusable transport method (opens pool of SMTP connections)
/*
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "gmail.user@gmail.com",
        pass: "userpass"
    }
});
*/

// Create a Direct transport object
var transport = nodemailer.createTransport("Direct", {debug: true});

exports.send = function(req,res) {

    console.log('Sending Mail');
    // setup e-mail data with unicode symbols
    //console.log(req.body);

    var html = "<b>Email</b>"+ req.body.email + '<p>'+ req.body.comment +'</p>';
   
    var message = {
        from: "System <info@dylan@dylanlawrence.com>", // sender address
        to: "dylanslawrence@gmail.com, dylan@dylanlawrence.com", // list of receivers
        subject: req.body.name, // Subject line
        //text: "Hello world ✔", // plaintext body
        html: html
    }


 
    // send mail with defined transport object
    transport.sendMail(message, function(error, response){
        if(error){
            console.log("SEND ERROR - "+error);
        }else{
            console.log("Message sent: " + response.message);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
    

}