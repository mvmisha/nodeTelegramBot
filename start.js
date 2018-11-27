var config = require('./config.json');
var request = require('request');
var cheerio = require('cheerio');
const utf8 = require('utf8');
console.log(config.key);



var urlMensaje = "https://api.telegram.org/bot"+config.key+"/sendPhoto?chat_id=@mishanode&photo=";
var urlSpeedhunters = 'http://speedhunters.com';
var src, srcOld, href, title;



request(urlSpeedhunters, function (err, resp, html) {
	if (!err) {
		const $ = cheerio.load(html);
		src = $(".with-image img:first-child").attr('src');
		if (src != srcOld) {
			href = $(".with-image a:first-child").attr('href');
			title = $(".with-image img:first-child").attr('alt');
			title = utf8.encode(title.replace("&", "and"))
			urlMensaje = urlMensaje + src + "&caption=" + title + " " + href;
			console.log(urlMensaje);
			request(urlMensaje, function (err, resp, html) {
				console.log(html);
			});
		}

	}
});
