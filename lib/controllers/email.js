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



exports.send = function(message,cb) {

	// Create a Direct transport object
	var transport = nodemailer.createTransport("Direct", {debug: true});

    // send mail with defined transport object
    transport.sendMail(message, function(error, response){
        
        if(error){
            console.log("SEND ERROR - "+error);
        }else{
            console.log("Message sent: " + response.message);
        }

        cb();
        // if you don't want to use this transport object anymore, uncomment following line
        transport.close(); // shut down the connection pool, no more messages
    });
    

}