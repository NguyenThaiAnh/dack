var express = require('express');
var router = express.Router();
var productCtl = require('../controllers/productCtl');
var Category = require('../models/category');
var Producer = require('../models/producer');
var decentralization = require('../config/decentralization');
router.get('/:id',productCtl.findProductbyId);
router.get('/admin/add',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,function (req,res,next) {
    Category.find(function (err,rs) {
        Producer.find(function (err,rsproducer) {
            res.render('admin/product/addproduct',{layout: 'layoutadmin', categories: rs,producer: rsproducer});
        });

    });
});
router.post('/search',productCtl.search);
router.post('/admin/add',isLoggedIn,decentralization.checkactive,decentralization.checkadmin, productCtl.createProduct);
router.get('/admin/list',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,productCtl.loadProductAdmin);
router.get('/edit/:id',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,isLoggedIn,decentralization.checkadmin,productCtl.edit);
router.post('/delete',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,isLoggedIn,decentralization.checkadmin,productCtl.deleteProduct);
router.get('/product-by-page/:pageindex', productCtl.loadProductByPage);
router.get('/product-by-category/:category', productCtl.findByCategory);

module.exports = router;
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}