var express = require("express");
var async = require("async");
var request = require("request");
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static("public"));
app.set("view engine", "jade");

var backends = ["http://localhost:8080"];

app.get("/", function(req, res) {
	res.render("index");
});

app.get("/vms", function(req, res) {
	async.map(backends, function iterator(item, callback) {
		request.get(item + "/vms", function(err, resp, body) {
			callback(null, JSON.parse(body));
		});
	}, function done(err, vms) {
		var result = [];
		for (var i in vms) {
			for (var j = 0; j < vms[i].length; j++) {
				// Put the host information as well
				vms[i][j].host = backends[i];
				result.push(vms[i][j]);
			}
		}
		res.send(result);
	});
});

app.post("/vms/stop", function(req, res) {
	request.get(req.body.host + "/vm/" + req.body.name + "/stop", function(err,resp,body){
		res.send("ok");
	});
});

app.post("/vms/start", function(req, res) {
	request.get(req.body.host + "/vm/" + req.body.name + "/start", function(err,resp,body){
		res.send("ok");
	});
});

app.get("/hosts", function(req, res) {
	res.send(backends);
});

app.get("/networks", function(req, res) {
	async.map(backends, function iterator(item, callback) {
		request.get(item + "/networks", function(err, resp, body) {
			callback(null, JSON.parse(body));
		});
	}, function done(err, vms) {
		var result = [];
		for (var i in vms) {
			for (var j = 0; j < vms[i].length; j++) {
				// Put the host information as well
				vms[i][j].host = backends[i];
				result.push(vms[i][j]);
			}
		}
		res.send(result);
	});
});

app.get("/images", function(req, res) {
	async.map(backends, function iterator(item, callback) {
		request.get(item + "/images", function(err, resp, body) {
			callback(null, JSON.parse(body));
		});
	}, function done(err, vms) {
		var result = [];
		for (var i in vms) {
			for (var j = 0; j < vms[i].length; j++) {
				// Put the host information as well
				result.push({
					name: vms[i][j],
					host: backends[i]
				});
			}
		}
		res.send(result);
	});
});

app.get("/partials/*", function(req, res) {
	// TODO: Directory traversal attack
	var template = req.params[0].replace(".html", "");
	res.render("partials/" + template);
});

app.get("/panel", function(req, res) {
	res.render("panel");
});

app.listen(5000);