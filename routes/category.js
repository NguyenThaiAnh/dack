/**
 * Created by truon on 6/25/2017.
 */
var express = require('express');
var router = express.Router();
var categoryCtl = require('../controllers/categoryCtl');
var decentralization = require('../config/decentralization');
router.post('/add',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,categoryCtl.createCategory);
router.get('/admin/add',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,function (req,res,next) {
    res.render('admin/category/add',{layout: 'layoutadmin'});
});
router.get('/admin/list',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,
    categoryCtl.loadCategoryTable);

router.get('/list',categoryCtl.loadCategory);
router.post('/delete',isLoggedIn,decentralization.checkadmin,categoryCtl.deleteCategory);
router.get('/', categoryCtl.loadCategory);
router.post('/edit',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,categoryCtl.editCategory);
router.get('/edit/:id',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,categoryCtl.edit);
module.exports = router;
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}