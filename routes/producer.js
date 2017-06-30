/**
 * Created by truon on 6/27/2017.
 */
var express = require('express');
var router = express.Router();
var producerCtl=  require('../controllers/producerCtl');
var decentralization = require('../config/decentralization');
router.get('/list',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,producerCtl.loadProducer);
router.get('/admin/add',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,function (req,res,next) {
    res.render('admin/producer/add',{layout: 'layoutadmin'});
});
router.post('/admin/add',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,producerCtl.createProducer);
router.get('/admin/list',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,
    producerCtl.loadProducerTable);
router.post('/delete',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,producerCtl.deleteProducer);
router.post('/edit',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,producerCtl.editProducer);
router.get('/edit/:id',isLoggedIn,decentralization.checkactive,decentralization.checkadmin,producerCtl.edit);
module.exports = router;
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}