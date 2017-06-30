var Type = require('../models/type');
var Category = require('../models/category');
exports.loadTypebyCategory = function (req,res,next) {
    Category.findOne({'title':req.body.category},function (err,category) {
        Type.find({'category': category._id},function (err, docs) {
            if(err)
                console.log(err);
            res.json(docs);
        });
    });

};

exports.loadTypeTable = function (req, res, next) {
    Type.find(function (err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('admin/type/list', {layout: 'layoutadmin', types: productChunks});

    });
};
exports.createType = function (req,res,next)
{
    Type.findOne({'title': req.body.title},function(err,result) {
        if(err) {
            req.flash('err', err);
            var err = req.flash('err');
            res.render('admin/type/add', {errMsg: err,title: req.body.title,description: req.body.description,layout:'layoutadmin'});
        }
        if(result) {
            req.flash('err', 'Trung ten');
            var err = req.flash('err');
            res.render('admin/type/add', {errMsg: err,title: req.body.title,description: req.body.description,layout:'layoutadmin'});
        }
        if(!result)
        {
console.log(req.body.categoryselect);
            Category.findOne({'title': req.body.categoryselect },function (err,result) {
                var newType = new Type();
                newType.title = req.body.title;
                newType.description = req.body.description;
                newType.category = result._id;
                console.log(result._id);
                newType.save(function (err,result) {
                    req.flash('success' ,'Add thanh cong');
                    var message = req.flash('success');
                    res.render('admin/type/add',{successMsg: message ,layout:'layoutadmin'});
                });
            });

        }
    });
}

exports.deleteType = function (req, res, next) {
    Type.remove({'_id': req.body.id}, function (err) {
        if (err)
            throw err;
        else
            res.redirect('/type/admin/list');
    });
};
exports.editType = function (req, res, next) {
    console.log(req.body.id);
    Type.findOne({'_id': req.body.id}
        , function (err, rs) {
            if (err)
                throw err;
            else {
                if (rs.title == req.body.title) {
                    Category.update({'_id': req.body.id}, {
                        title: req.body.title,
                        description: req.body.description
                    }, function (err, rs) {
                        if (err)
                            console.log(err);
                        else {
                            console.log(rs);
                            res.redirect('/type/admin/list');
                        }
                    });
                }
                else {
                    Type.findOne({'title': req.body.title}, function (err, result) {
                        if (err)
                            throw err;
                        if (result) {
                            req.flash('err', 'Trùng tên');
                            var err = req.flash('err');
                            res.render('admin/type/edit', {
                                errMsg: err,
                                _id: req.body.id,
                                title: req.body.title,
                                description: req.body.description,
                                layout: 'layoutadmin'
                            });
                        }
                        if (!result) {

                            Type.update({'_id': req.body.id}, {
                                title: req.body.title,
                                description: req.body.description
                            }, function (err, rs) {
                                if (err)
                                    console.log(err);
                                else {
                                    console.log(rs);
                                    res.redirect('/type/admin/list');
                                }
                            });
                        }
                    });
                }
            }
        });
};
exports.edit = function (req, res, next) {
    Type.findOne({'_id': req.params.id}, function (err, rs) {
        if (err)
            console.log(err);
        else {
            console.log(rs);
            res.render('admin/type/edit', {
                layout: 'layoutadmin',
                _id: rs._id,
                title: rs.title,
                description: rs.description
            });
        }
    });
};