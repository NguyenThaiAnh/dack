/**
 * Created by truon on 6/25/2017.
 */
var express = require('express');
var router = express.Router();
var commentCtl = require('../controllers/commentCtl');
router.get('/:id',commentCtl.loadcomment );
router.post('/',commentCtl.createcomment );
module.exports = router;