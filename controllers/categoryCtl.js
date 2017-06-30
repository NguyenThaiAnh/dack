var Category = require('../models/category');
exports.loadCategory = function (req, res, next) {
    Category.find(function (err, docs) {
        res.json(docs);
    });
};
exports.loadCategoryTable = function (req, res, next) {
    Category.find(function (err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('admin/category/list', {layout: 'layoutadmin', categories: productChunks});

    });
};
exports.loadCategorybyName = function (req, res, next) {
    Category.findOne({'title': req.body.title}, function (err, docs) {
        if (err)
            throw err;
        else
            res.send(docs);

    })

}
exports.createCategory = function (req, res, next) {
    Category.findOne({'title': req.body.title}, function (err, result) {
        if (err) {
            req.flash('err', err);
            var err = req.flash('err');
            res.render('admin/category/add', {
                errMsg: err,
                title: req.body.title,
                description: req.body.description,
                layout: 'layoutadmin'
            });
        }
        if (result) {
            req.flash('err', 'Trung ten');
            var err = req.flash('err');
            res.render('admin/category/add', {
                errMsg: err,
                title: req.body.title,
                description: req.body.description,
                layout: 'layoutadmin'
            });
        }
        if (!result) {
            var newCategory = new Category();
            newCategory.title = req.body.title;
            newCategory.description = req.body.description;
            newCategory.save(function (err, result) {
                if (err)
                    console.log(err);
                req.flash('success', 'Add thanh cong');
                var message = req.flash('success');
                res.render('admin/category/add', {successMsg: message, layout: 'layoutadmin'});
            });
        }
    });
};

exports.deleteCategory = function (req, res, next) {
    Category.remove({'_id': req.body.id}, function (err) {
        if (err)
            throw err;
        else
            res.redirect('/category/admin/list');
    });
};
exports.editCategory = function (req, res, next) {
    console.log(req.body.id);
    Category.findOne({'_id': req.body.id}
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
                            res.redirect('/category/admin/list');
                        }
                    });
                }
                else {
                    Category.findOne({'title': req.body.title}, function (err, result) {
                        if (err)
                            throw err;
                        if (result) {
                            req.flash('err', 'Trùng tên');
                            var err = req.flash('err');
                            res.render('admin/category/edit', {
                                errMsg: err,
                                _id: req.body.id,
                                title: req.body.title,
                                description: req.body.description,
                                layout: 'layoutadmin'
                            });
                        }
                        if (!result) {

                            Category.update({'_id': req.body.id}, {
                                title: req.body.title,
                                description: req.body.description
                            }, function (err, rs) {
                                if (err)
                                    console.log(err);
                                else {
                                    console.log(rs);
                                    res.redirect('/category/admin/list');
                                }
                            });
                        }
                    });
                }
            }
        });
};
exports.edit = function (req, res, next) {
    Category.findOne({'_id': req.params.id}, function (err, rs) {
        if (err)
            console.log(err);
        else {
            console.log(rs);
            res.render('admin/category/edit', {
                layout: 'layoutadmin',
                _id: rs._id,
                title: rs.title,
                description: rs.description
            });
        }
    });
};