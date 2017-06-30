/**
 * Created by truon on 6/27/2017.
 */
var Producer = require('../models/producer');
exports.createProducer = function (req,res,next)
{
    Producer.findOne({'name': req.body.name},function(err,result) {
        if(err) {
            req.flash('err', err);
            var err = req.flash('err');
            res.render('admin/producer/add', {errMsg: err,name: req.body.title,description: req.body.description,layout: 'layoutadmin'});
        }
        if(result) {
            req.flash('err', 'Trung ten');
            var err = req.flash('err');
            res.render('admin/producer/add', {errMsg: err,name: req.body.title,description: req.body.description,layout: 'layoutadmin'});
        }
        if(!result)
        {
            var newCategory = new Producer();
            newCategory.name = req.body.name;
            newCategory.description = req.body.description;
            newCategory.save(function (err,result) {
                if(err)
                    console.log(err);
                req.flash('success' ,'Add thành công');
                var message = req.flash('success');
                res.render('admin/producer/add',{successMsg: message,layout: 'layoutadmin'});
            });
        }
    });
}
exports.loadProducer =  function (req,res,next) {
    Producer.find(function (err, docs) {
        res.json(docs);
    });
};
exports.loadProducerTable = function (req, res, next) {
    Producer.find(function (err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('admin/producer/list', {layout: 'layoutadmin', producers: productChunks});

    });
};

exports.deleteProducer = function (req, res, next) {
    Producer.remove({'_id': req.body.id}, function (err) {
        if (err)
            throw err;
        else
            res.redirect('/producer/admin/list');
    });
};
exports.editProducer = function (req, res, next) {
    console.log(req.body.id);
    Producer.findOne({'_id': req.body.id}
        , function (err, rs) {
            if (err)
                throw err;
            else {
                if (rs.name == req.body.name) {
                    Producer.update({'_id': req.body.id}, {
                        name: req.body.name,
                        description: req.body.description
                    }, function (err, rs) {
                        if (err)
                            console.log(err);
                        else {
                            console.log(rs);
                            res.redirect('/producer/admin/list');
                        }
                    });
                }
                else {
                    Producer.findOne({'name': req.body.name}, function (err, result) {
                        if (err)
                            throw err;
                        if (result) {
                            req.flash('err', 'Trùng tên');
                            var err = req.flash('err');
                            res.render('admin/producer/edit', {
                                errMsg: err,
                                _id: req.body.id,
                                title: req.body.name,
                                description: req.body.description,
                                layout: 'layoutadmin'
                            });
                        }
                        if (!result) {

                            Producer.update({'_id': req.body.id}, {
                                title: req.body.name,
                                description: req.body.description
                            }, function (err, rs) {
                                if (err)
                                    console.log(err);
                                else {
                                    console.log(rs);
                                    res.redirect('/producer/admin/list');
                                }
                            });
                        }
                    });
                }
            }
        });
};
exports.edit = function (req, res, next) {
    Producer.findOne({'_id': req.params.id}, function (err, rs) {
        if (err)
            console.log(err);
        else {
            console.log(rs);
            res.render('admin/producer/edit', {
                layout: 'layoutadmin',
                _id: rs._id,
                name: rs.name,
                description: rs.description
            });
        }
    });
};