'use strict';

var ALY = require('aliyun-sdk'),
  fs = require('fs'),
  mime = require('mime');

var ossStream = require('./lib/aliyun-oss-upload-stream.js')(new ALY.OSS({
  accessKeyId: 'brgW2NccIYZRLcqj',
  secretAccessKey: 'G8Oa7kNaDvO02tn8uktTX32inyfgm9',
  endpoint: 'http://oss-cn-qingdao.aliyuncs.com',
  apiVersion: '2013-10-15'
}));

var rootPrefix = 'www/';

var paths = [
  rootPrefix + 'scripts',
  rootPrefix + 'styles'
  ];

paths.forEach(function (path) {
  uploadFolderToCdn(path);
});



function uploadFolderToCdn(path){
  fs.readdir(path, function(err, files) {
    if (err) {
      console.log('read dir error');
    } else {
      files.forEach(function(item) {
        var tmpPath = path + '/' + item;
        fs.stat(tmpPath, function(err1, stats) {
          if (err1) {
            console.log('stat error');
          } else {
            //TODO: 递归实现嵌套目录
            //if (stats.isDirectory()) {
            //  walk(tmpPath, floor, handleFile);
            //} else {
            //  handleFile(tmpPath, floor);
            //}
            console.log("tmpPath:"+tmpPath);
            var read = fs.createReadStream(tmpPath);
            var uploader = uploaderFactory(tmpPath.substr(rootPrefix.length));
            read.pipe(uploader);
          }
        })
      });

    }
  });

}

function uploaderFactory(fileName){
  var bucketName = 'solidmedical-cdn';
  var bucketPathPrefix = 'static/baoxian/app/';
  var startTime = new Date();
  var upload = ossStream.upload({
    Bucket: bucketName,
    Key: bucketPathPrefix + fileName,
    ContentType: getContentType(fileName)
  });

  upload.on('error', function (error) {
    console.log('error:', error);
  });

  upload.on('part', function (part) {
    console.log('part:', part);
  });

  upload.on('uploaded', function (details) {
    var s = (new Date() - startTime) / 1000;
    console.log('details:', details);
    console.log('Completed upload in %d seconds', s);
  });

  return upload;
}


function getContentType(fileName){
  return mime.lookup(fileName);
}
