var http = require('http');

var myRequest = function(message) {
  var request = http.request('http://balmjs.com', function(response) {
    response.pipe(process.stdout, { end: false });
  });

  request.write(message);
  request.end();
};

module.exports = myRequest;
