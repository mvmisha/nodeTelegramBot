var config = require('./config.json'),
	request = require('request'),
	cheerio = require('cheerio'),
	utf8 = require('utf8'),
	fs = require('fs'),
	urlMensaje = "https://api.telegram.org/bot" + config.key + "/sendPhoto?chat_id=" + config.channel + "&photo=",
	urlSpeedhunters = 'http://speedhunters.com',
	src,
	srcOld=config.photo,
	href, 
	title;

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
				sendMessageTelegram(urlMensaje);
				srcOld=src;
				fs.writeFileSync('./config.json', JSON.stringify(config));
			} else {
				console.log((new Date(Date.now()).toLocaleString()) +" - Message not sent, it's the same article")
			}
		}
	});
}
function sendMessageTelegram(urlMensaje) {
	request(urlMensaje, function (err, resp, html) {
		if (!err) {
			console.log((new Date(Date.now()).toLocaleString()) +" - Message sent, it's a new article")
		}
	});
}
var requestLoop = setInterval(function(){
  speedhuntersLoad();
}, 1800000);

