var config = require('./config.json');
console.log(config.key);


var request = require('request');
var cheerio = require('cheerio');

request('http://speedhunters.com', function(err, resp, html) {
        if (!err){
          const $ = cheerio.load(html);
          console.log(html); 
      }
});
