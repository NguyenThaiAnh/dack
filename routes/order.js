/**
 * Created by truon on 6/29/2017.
 */
var express = require('express');
var router = express.Router();
var decentralization = require('../config/decentralization');
var  OderCtl = require('../controllers/oderCtl');
router.get('/',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,function (req,res,next) {
    res.render('admin/order/statistical',{layout:'layoutadmin'});
});
router.post('/daystatistical',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,OderCtl.daystatistical);
router.post('/monthstatistical',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,OderCtl.monthstatistical);
router.post('/quarterstatistical',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,OderCtl.quarterstatistical);
router.post('/yearstatistical',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,OderCtl.yearstatistical);
router.get('/top10json',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,OderCtl.top10);
router.get('/top10',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,function (req,res,next) {
    res.render('admin/order/top10',{layout:'layoutadmin'});
});
module.exports = router;
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}