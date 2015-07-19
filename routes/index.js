var express = require('express');
var router = express.Router();
var quickShare = require('./QuickShare');
quickShare.setSharePath("/");
quickShare.listPath = "/file";
quickShare.downloadPath = "/:downloads";


router.get(quickShare.listPath,quickShare.getFileList);
router.get(quickShare.listPath + quickShare.downloadPath ,quickShare.getFile);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
