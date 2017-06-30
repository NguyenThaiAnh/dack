/**
 * Created by truon on 6/25/2017.
 */
var Comment = require('../models/comment');
exports.loadcomment = function (req,res,next) {
    Comment.find({'product': req.params.id}, function (err, comments) {
        if (err) {
            console.log('loi1');
        }
        if(comments)
        {
            //console.log(comments);
            res.type('text/plain');
            res.json(comments);
        }
    });
};
exports.createcomment = function (req,res,next) {
    var newComment = new Comment();
    if(req.user)
    {
        newComment.name = req.user.profile.name;
        newComment.user = req.user;
        newComment.content = req.body.content;
        newComment.product =req.body.product;
    }
    else
    {
        newComment.name = req.body.name;
        newComment.content = req.body.content;
        newComment.product =req.body.product;
    }
    newComment.save(function (err,result) {
       if(err)
           console.log(err);
       else {
           console.log(result);
           res.type('text/plain');
           res.json(result);
       }
    });
}