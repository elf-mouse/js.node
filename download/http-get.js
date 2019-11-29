// Dependencies
var fs = require("fs");
var url = require("url");
var http = require("http");
var config = require("./config");

// Function for downloading file using HTTP.get
var download_file_httpget = function(file_url) {
  var options = {
    host: url.parse(file_url).host,
    port: 80,
    path: url.parse(file_url).pathname
  };

  var file_name = url
    .parse(file_url)
    .pathname.split("/")
    .pop();
  var file = fs.createWriteStream(config.DOWNLOAD_DIR + file_name);

  http.get(options, function(res) {
    res
      .on("data", function(data) {
        file.write(data);
      })
      .on("end", function() {
        file.end();
        console.log(
          "http.get: " + file_name + " downloaded to " + config.DOWNLOAD_DIR
        );
      });
  });
};

module.exports = download_file_httpget;
