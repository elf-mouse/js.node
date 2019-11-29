var exec = require("child_process").exec;
var config = require("./config");
// var download = require("./http-get");
// var download = require("./curl");
var download = require("./wget");

// We will be downloading the files to a directory, so make sure it's there
// This step is not required if you have manually created the directory
var mkdir = "mkdir -p " + config.DOWNLOAD_DIR;
var child = exec(mkdir, function(err, stdout, stderr) {
  if (err) throw err;
  else download(config.fileUrl);
});
