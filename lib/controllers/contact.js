
var email = require("./email"),
    config = require('../config/config');


exports.send = function(req,res) {

    // setup e-mail data with unicode symbols
    console.log(req.body);

    var message = {
        from: "System <dylan@dylan@dylanlawrence.com>", // sender address
        to: "dylanslawrence@gmail.com, dylan@dylanlawrence.com", // list of receivers
        subject: req.body.name, // Subject line
        //text: "Hello world ✔", // plaintext body
        //html: "<html" // html body
    }

    message.html = "<b>Email:</b><br/>"+ req.body.email + '<p>'+ req.body.comment +'</p>';



    email.send(message,cb);

}