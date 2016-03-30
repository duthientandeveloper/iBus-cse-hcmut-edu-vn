var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/routes', function(req, res, next) {
	request({
		uri: "http://thongtinxebuyt.com/RouteStation/GetRoute",
		method: "GET",
		timeout: 10000,
		followRedirect: true,
		maxRedirects: 10
	}, function(error, response, body) {
		var data = JSON.parse(body);
		console.log(body);
		res.json(data)
	});	
});

router.get('/stops', function(req, res, next) {
	var id = req.query.idroute;
	request({
		uri: "http://thongtinxebuyt.com/RouteStation/GetRouteConnection?id_route="+id+"&is_checked=0",
		method: "GET",
		timeout: 10000,
		followRedirect: true,
		maxRedirects: 10
	}, function(error, response, body) {
		var data = JSON.parse(body);
		res.json(data)
	});	
});

module.exports = router;