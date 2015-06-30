//QuickShare.js
var fs = require('fs');
var path = require('path');

var quickShare = {

	sharePath: undefined,
	listPath : undefined,
	downloadPath: undefined,

	setSharePath: function(sharePath){
		this.sharePath = sharePath;
	},

	getFileList: function(req, res, next) {
		if (!req.params.downloads) {
			if (quickShare.sharePath) {
				var dir = fs.readdirSync(quickShare.sharePath);
				var li = '';
				dir.forEach(function(element, index) {
					li = li + "<li><a href='"+quickShare.listPath+"/"+ element + "'>" + element + "</a></li>"
				});
				res.send(li);
			} else {
				console.log("Path not specified");
				res.sendStatus(200);
			}
		}else{
			next();
		}
	},

	getFile: function(req, res, next) {
		var fileParam = req.params.downloads;
		if(fileParam){
			var downloadURI =  quickShare.sharePath + "/" +fileParam;
			var isDir = fs.lstatSync(downloadURI).isDirectory();
			if(isDir){
					quickShare.sharePath = quickShare.sharePath + "/" +  fileParam;
					quickShare.setSharePath(quickShare.sharePath);
					res.redirect(quickShare.listPath);
			}else{
				res.sendFile(downloadURI);
			}
		}else{
			console.log('Download file not found ');
			res.send(200);
		}
	}


}
module.exports = quickShare;