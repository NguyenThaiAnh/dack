var Product = require('../models/product');
var Category = require('../models/category');
var Type = require('../models/type');
var Producer = require('../models/producer');
exports.findProductbyId = function (req, res, next) {
    Product.findOne({'_id': req.params.id}, function (err, product) {
        if (err) {
            console.log('loi1');
        }
        if (product) {
            product.count = product.count + 1;
            product.save(function (err) {
                if (err)
                    console.log(err)
                else
                    console.log('success');
            });
            res.render('shop/productdetail', {product: product});
        }
    });
};
exports.deleteProduct = function (req, res, next) {
    Product.remove({'_id': req.body.id}, function (err) {
        if (err)
            console.log(err);
        else
            res.redirect('/product/admin/list');
    });
};
exports.search = function (req,res,next) {


    Product.find({"title":  { $regex : new RegExp(req.body.search, "i") }}, function (err, product) {
        if (err) {
            console.log('loi1');
        }
        if (product)
        {
            var productChunks = [];
            var chunkSize = 3;
            for (var i = 0; i < product.length; i += chunkSize) {
                productChunks.push(product.slice(i, i + chunkSize));
            }
            console.log(product);
            res.render('shop/search', {products: productChunks});
        }
    });
};
exports.editProduct = function (req, res, next) {
    Product.update({_id: id}, {
        imagePath1: imagePath1,
        imagePath2: imagePath2,
        imagePath3: imagePath3,
        title: title,
        description: description,
        price: price,
        priceold: priceold,
        category: category
    }, function (err, doc) {
        if (err) throw err;
        else
            res.send('done');

    });

};

exports.createProduct = function (req, res, next) {

    Product.findOne({'title': req.body.title}, function (err, result) {
        if (err) {
            req.flash('err', err);
            var err = req.flash('err');
            res.render('admin/product/addproduct', {
                errMsg: err,
                title: req.body.title,
                description: req.body.description,
                layout: 'layoutadmin'
            });
        }
        if (result) {
            req.flash('err', 'Trung ten');
            var err = req.flash('err');
            res.render('admin/product/addproduct', {
                errMsg: err,
                title: req.body.title,
                description: req.body.description,
                layout: 'layoutadmin'
            });
        }
        if (!result) {

            Producer.findOne({'name': req.body.slproducer}, function (err, resultct) {
                Type.findOne({'title': req.body.sltype}, function (err, resulttp) {
                    Category.findOne({'title': req.body.slcategory}, function (err, resultpc) {
                        var newProduct = new Product();
                        newProduct.title = req.body.title;
                        newProduct.description = req.body.description;

                        newProduct.category = resultct;
                        newProduct.type = resulttp;
                        newProduct.producer = resultpc;
                        newProduct.price = req.body.price;
                        newProduct.count = 0;
                        newProduct.Oldprice = req.body.price;
                        newProduct.imagePath1 = req.body.image;
                        newProduct.save(function (err, result)
                            {
                                if (err)
                                    console.log(err);
                                else
                                {
                                    req.flash('success', 'Add thanh cong');
                                    var message = req.flash('success');
                                    res.redirect('/product/admin/list');}
                            }
                        );
                    });
                });
            });

        }
    });
};

exports.loadProduct = function (req, res, next) {
    var successMsg = req.flash('success')[0];
    Product.find(function (err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', {
            title: 'Shopping Cart',
            products: productChunks,
            successMsg: successMsg,
            noMessages: !successMsg
        });
    });
}
exports.loadProductAdmin = function (req, res, next) {

    Product.find(function (err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('admin/product/list', {title: 'Shopping Cart', layout: 'layoutadmin', products: productChunks});
    });
}
exports.edit = function (req, res, next) {
    Category.find(function (err,rs) {
        Producer.find(function (err,rsproducer) {

            Product.findOne({'_id': req.params.id}, function (err, rspr) {
                if (err)
                    console.log(err);
                else {
                    res.render('admin/product/edit', {
                        layout: 'layoutadmin',
                        _id: rspr._id,
                        title: rspr.title,
                        description: rspr.description,
                        price: rspr.price,
                        categories: rs,producer: rsproducer
                    });
                }
            });
        });

    });

};
exports.loadProductByPage = function(req, res, next){
    if(req.params.pageindex < 0 )
        totalSkipItem = 0;
    else
        var totalSkipItem = req.params.pageindex * 6;

    var totalItem;

    Product.find(function (err, docs) {
        totalItem = docs.length;
    }).then(function(s){
        Product.find(function (err, docs) {
            var productChunks = [];
            var chunkSize = 3;
            for (var i = 0; i < docs.length; i += chunkSize) {
                productChunks.push(docs.slice(i, i + chunkSize));
            }
            var totalPage = parseInt(totalItem / 6);
            if(totalItem % 6 > 0)
                totalPage += 1;
            var response = {};
            response.TotalPage = totalPage;
            response.Result = docs;
            res.send(response);
        }).skip(totalSkipItem).limit(6);
        ;
    });


}

exports.loadCateGory = function(req, res, next){



}

exports.findByCategory = function(req, res, next){
    Product.find({'category': req.params.category},function (err,rs) {
        res.send(rs);
    });
}