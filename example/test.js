var path, qrdecoder;

qrdecoder = require('..')({try_header:true});

path = "./a.jpg";

qrdecoder.decode(path, (function(_this) {
  return function(err, out) {
    return console.log(err, out);
  };
})(this));
