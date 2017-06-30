/**
 * Created by truon on 6/26/2017.
 */
var express = require('express');
var router = express.Router();
var TypeCtl = require('../controllers/typeCtl');
var decentralization = require('../config/decentralization');

router.post('/add', TypeCtl.createType);
router.get('/admin/add',function (req,res,next) {
   res.render('admin/type/add' , {layout:'layoutadmin'});
});

router.post('/list',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,TypeCtl.loadTypebyCategory);




router.get('/admin/list',TypeCtl.loadTypeTable);
router.post('/delete',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,TypeCtl.deleteType);
router.post('/edit',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,TypeCtl.editType);
router.get('/edit/:id',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,TypeCtl.edit);

module.exports = router;
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}