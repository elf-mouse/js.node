// Dependencies
var fs = require("fs");
var url = require("url");
var spawn = require("child_process").spawn;
var config = require("./config");

// Function for downloading file using curl
var download_file_curl = function(file_url) {
  // extract the file name
  var file_name = url
    .parse(file_url)
    .pathname.split("/")
    .pop();
  // create an instance of writable stream
  var file = fs.createWriteStream(config.DOWNLOAD_DIR + file_name);
  // execute curl using child_process' spawn function
  var curl = spawn("curl", [file_url]);
  // add a 'data' event listener for the spawn instance
  curl.stdout.on("data", function(data) {
    file.write(data);
  });
  // add an 'end' event listener to close the writeable stream
  curl.stdout.on("end", function(data) {
    file.end();
    console.log("curl: " + file_name + " downloaded to " + config.DOWNLOAD_DIR);
  });
  // when the spawn child process exits, check if there were any errors and close the writeable stream
  curl.on("exit", function(code) {
    if (code != 0) {
      console.log("Failed: " + code);
    }
  });
};

module.exports = download_file_curl;
