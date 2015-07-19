var express = require('express');
var router = express.Router();
var quickShare = require('./QuickShare');
quickShare.setSharePath("/");
quickShare.listPath = "/";
quickShare.downloadPath = "/:downloads";


router.get(quickShare.listPath,quickShare.getFileList);
router.get(quickShare.listPath + quickShare.downloadPath ,quickShare.getFile);

 


module.exports = router;
