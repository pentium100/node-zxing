/* Copyright 2012 Thomas Schaaf, see LICENSE */
"use strict";

var exec = require('child_process').exec;
var path = require('path');
var cpSeparator = require('os').type().match(/^win/i) ? ";" : ":";

module.exports = function (options) {
  var defaults = options || {};

  if(defaults.ZXingLocation == null) {
    defaults.ZXingLocation = path.join(__dirname, "..", "zxing");
  }

  if(defaults.ZXingVersion == null) {
    defaults.ZXingVersion = "-3.3.1"
  }

  var commandLineOptions = " ";
  if(defaults.try_harder) {
    commandLineOptions += "--try_harder ";
  }
  if(defaults.multi) {
    commandLineOptions += "--multi ";
  }
  return {
    decode: function(filePath, cb) {
      console.log('java -cp '+path.join(defaults.ZXingLocation, 'javase', 'javase'+defaults.ZXingVersion+'.jar')+cpSeparator+path.join(defaults.ZXingLocation, 'core', 'core'+defaults.ZXingVersion+'.jar')+cpSeparator+path.join(defaults.ZXingLocation, 'javase', 'jcommander-1.48'+'.jar')+' com.google.zxing.client.j2se.CommandLineRunner'+commandLineOptions+''+filePath);
      exec('java -cp '+path.join(defaults.ZXingLocation, 'javase', 'javase'+defaults.ZXingVersion+'.jar')+cpSeparator+path.join(defaults.ZXingLocation, 'core', 'core'+defaults.ZXingVersion+'.jar')+cpSeparator+path.join(defaults.ZXingLocation, 'javase', 'jcommander-1.48'+'.jar')+' com.google.zxing.client.j2se.CommandLineRunner'+commandLineOptions+''+filePath,
      //exec('java -cp '+path.join(defaults.ZXingLocation, 'javase', 'javase'+defaults.ZXingVersion+'.jar')+cpSeparator+path.join(defaults.ZXingLocation, 'core', 'core'+defaults.ZXingVersion+'.jar')+cpSeparator+path.join(defaults.ZXingLocation, 'javase', 'jcommander-1.48'+'.jar')+' com.google.zxing.client.j2se.GUIRunner'+commandLineOptions+''+filePath,
        function(err, stdout, stderr){
          var qrcode = "";
          var errorCache = null;
          if(err !== null) {
            errorCache = err;
          } else {
            var lines = stdout.split("\n");

            for(var i in lines) {
              if(lines[i] == 'Raw result:') {
                qrcode = lines[parseInt(i)+1];
                break;
              }
            }

          }
          cb(errorCache, qrcode);
        }
      );
    }
  };
}
