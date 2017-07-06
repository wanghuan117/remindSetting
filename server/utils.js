"use strict";

var fs = require('fs');

var mimeNames = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.ogg': 'application/ogg',
  '.ogv': 'video/ogg',
  '.oga': 'audio/ogg',
  '.txt': 'text/plain',
  '.wav': 'audio/x-wav',
  '.webm': 'video/webm'
};


module.exports = function (){
  return{
    readRangeHeader:readRangeHeader,
    getMimeNameFromExt:getMimeNameFromExt
  }
};


function readRangeHeader(range, totalLength) {
  /*
   * Example of the method 'split' with regular expression.
   *
   * Input: bytes=100-200
   * Output: [null, 100, 200, null]
   *
   * Input: bytes=-200
   * Output: [null, null, 200, null]
   */

  if (range == null || range.length == 0)
    return null;

  var array = range.split(/bytes=([0-9]*)-([0-9]*)/);
  var start = parseInt(array[1]);
  var end = parseInt(array[2]);
  var result = {
    Start: isNaN(start) ? 0 : start,
    End: isNaN(end) ? (totalLength - 1) : end
  };

  if (!isNaN(start) && isNaN(end)) {
    result.Start = start;
    result.End = totalLength - 1;
  }

  if (isNaN(start) && !isNaN(end)) {
    result.Start = totalLength - end;
    result.End = totalLength - 1;
  }

  return result;
}


function getMimeNameFromExt(ext) {
  var result = mimeNames[ext.toLowerCase()];

  // It's better to give a default value.
  if (result == null)
    result = 'application/octet-stream';

  return result;
}



