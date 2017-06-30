var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'ptudwth14shopping@gmail.com',
        pass: '123456A@'
    }
});