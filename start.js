var config = require('./config.json');
var request = require('request');
var cheerio = require('cheerio');
const utf8 = require('utf8');

var urlMensaje = "https://api.telegram.org/bot" + config.key + "/sendPhoto?chat_id=" + config.channel + "&photo=";
var urlSpeedhunters = 'http://speedhunters.com';
var src, srcOld, href, title;

function speedhuntersLoad() {
	request(urlSpeedhunters, function (err, resp, html) {
		if (!err) {
			const $ = cheerio.load(html);
			src = $(".with-image img:first-child").attr('src');
			if (src != srcOld) {
				href = $(".with-image a:first-child").attr('href');
				title = $(".with-image img:first-child").attr('alt');
				title = utf8.encode(title.replace("&", "and"))
				urlMensaje = urlMensaje + src + "&caption=" + title + " " + href;
				sendMessageTelegram();
				srcOld=src;
			} else {
				console.log((new Date(Date.now()).toLocaleString()) +" - Message not sent, it's the same article")
			}
		}
	});
}
function sendMessageTelegram() {
	request(urlMensaje, function (err, resp, html) {
		if (!err) {
			console.log((new Date(Date.now()).toLocaleString()) +" - Message sent, it's a new article")
		}
	});
}
var requestLoop = setInterval(function(){
  speedhuntersLoad();
}, 1800000);



