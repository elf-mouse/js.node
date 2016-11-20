var url = require('url');

options = {
  // add URL options here
  protocol: 'http:',
  host: 'search.twitter.com',
  pathname: '/search.json',
  query: {
    q: 'balmjs'
  }
};

var searchURL = url.format(options);
console.log(searchURL);
