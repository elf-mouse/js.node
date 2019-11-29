// Dependencies
var fs = require("fs");
var url = require("url");
var exec = require("child_process").exec;
var config = require("./config");

// Function for downloading file using wget
var download_file_wget = function(file_url) {
  // extract the file name
  var file_name = url
    .parse(file_url)
    .pathname.split("/")
    .pop();
  // compose the wget command
  var wget = "wget -P " + config.DOWNLOAD_DIR + " " + file_url;
  // excute wget using child_process' exec function

  var child = exec(wget, function(err, stdout, stderr) {
    if (err) throw err;
    else
      console.log(
        "wget: " + file_name + " downloaded to " + config.DOWNLOAD_DIR
      );
  });
};

module.exports = download_file_wget;
