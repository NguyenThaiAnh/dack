var User = require('../models/user');
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'ptudwth14shopping@gmail.com',
        pass: '123456A@'
    }
});
var rand;
exports.sendmail =function (req, res, next)
{
    User.findOne({'_id': req.user._id}, function (err, user) {
        if (err) {
            console.log('loi1');
        }
        if (!user) {
            console.log('loi2');
        }
        if(user)
        {
            console.log(user.email);
            var mailOptions = {
                from: '"Do an cuoi ky" <ptudwth14shopping@gmail.com>', // sender address
                to: user.email, // list of receivers
                subject: 'Xác thực email', // Subject line
                text: 'http://localhost:3000/user/verify/' + user.authToken,
            };
            transporter.sendMail(mailOptions, function(error, info)
            {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });
            res.redirect('/');
        }
    });
};
exports.verify =function (req, res, next)
{
    User.findOne({'authToken': req.params.id}, function (err, user)
    {
        if (err) {
            console.log('loi1');
        }
        if (!user) {
            console.log('loi2');
        }
        if(user)
        {
            user.active = true;
            user.save(function (err) {
                if(err)
                {

                }
                else
                    res.send('Email ban da duoc kich hoat');

            });
        }
    });
}
exports.sendmailresetPass =function (req, res, next)
{
    User.findOne({'email': req.body.email}, function (err, user) {
        if (err) {
            console.log('loi1');
        }
        if (!user) {
            console.log('loi2');
        }
        if(user)
        {
            console.log(user.email);
            var mailOptions = {
                from: '"Do an cuoi ky" <ptudwth14shopping@gmail.com>', // sender address
                to: user.email, // list of receivers
                subject: 'Xác thực email', // Subject line
                text: 'http://localhost:3000/user/reset/' + user.authToken,
            };
            transporter.sendMail(mailOptions, function(error, info)
            {
                if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
            });
            res.redirect('/');
        }
    });
};

exports.resetpass =function (req, res, next)
{

    User.findOne({'authToken': req.body.auth}, function (err, user)
    {
        console.log(req.body.auth);
        if (err) {
            console.log('loi1');
        }
        if (!user) {
            console.log('loi2');
        }
        if(user)
        {
            var newUser = new User();
            user.password = newUser.encryptPassword(req.body.password);
            user.save(function (err) {
                if(err)
                {

                }
                else
                    req.flash('success', 'Doi mat khau thanh cong');
                    res.redirect('/user/signin');

            });
        }
    });
}
exports.loadUserTable = function (req, res, next) {
    User.find(function (err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('admin/account/list', {layout: 'layoutadmin', accounts: productChunks});

    });
};
exports.edit = function (req, res, next) {
    User.findOne({'_id': req.params.id}, function (err, rs) {
        if (err)
            console.log(err);
        else {
            res.render('admin/account/edit', {
                layout: 'layoutadmin',
                _id: rs._id,
                name: rs.profile.name,
                email: rs.email,
                phone: rs.profile.phone,
                address: rs.profile.address,
                active: rs.active,
            });
        }
    });
};
exports.editAccount = function (req, res, next) {


  User.update({'_id':req.body.id},{'profile.name' : req.body.name,'profile.phone':req.body.phone,'profile.address': req.body.address,'active':req.body.active,'admin':req.body.admin},function (err,rs) {
      if(err)
          console.log(err);
      else
      {
          console.log(rs);
          res.redirect('/user/admin/list');
      }
  });
};
exports.editAccountClient = function (req, res, next) {

    User.update({'_id':req.body.id},{'profile.name' : req.body.name,'profile.phone':req.body.phone,'profile.address': req.body.address},function (err,rs) {
        if(err)
            console.log(err);
        else
        {
            console.log(rs);
            res.redirect('/');
        }
    });
};
exports.changePassword = function (req, res, next)
{
    User.findOne({'_id': req.body.id}, function (err, user) {

        if (!user) {

        }
        var op = req.body.oldpassword;
        console.log(op);
        if (!user.validPassword(op)) {

        }
        var pass = user.encryptPassword(req.body.password);
        User.update({'_id': req.body.id},{'password':pass },function (err,rs) {
                res.redirect('/');
        });
    });
};