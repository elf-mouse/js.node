var url = require('url');

var options = {
  protocol: 'http:',
  host: 'search.twitter.com',
  pathname: '/search.json',
  query: { q: 'balmjs' }
};

var searchURL = url.format(options);

// https://github.com/request/request
var request = require('request');
request(searchURL, function(error, response, body) {
  console.log(body);
});
