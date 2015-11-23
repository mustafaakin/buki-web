var express = require("express");
var async = require("async");
var request = require("request");

var app = express();
app.use(express.static("public"));
app.set("view engine", "jade");

var backends = ["http://localhost:8080"];

app.get("/", function(req, res) {
	res.render("index");
});

app.get("/vms", function(req,res){
	async.map(backends, function iterator(item, callback){
		request.get(item + "/vms", function(err,resp,body){
			callback(null, JSON.parse(body));		
		});
	}, function done(err, vms){
		var result = [];
		for(var i in vms){
			for(var j = 0; j < vms[i].length; j++){
				// Put the host information as well
				vms[i][j].host = backends[i];
				result.push(vms[i][j]);
			}
		}
		res.send(result);
	});
});

app.get("/hosts", function(req,res){
	res.send(backends);
});

app.get("/networks", function(req,res){
	async.map(backends, function iterator(item, callback){
		request.get(item + "/networks", function(err,resp,body){
			callback(null, JSON.parse(body));		
		});
	}, function done(err, vms){
		var result = [];
		for(var i in vms){
			for(var j = 0; j < vms[i].length; j++){
				// Put the host information as well
				vms[i][j].host = backends[i];
				result.push(vms[i][j]);
			}
		}
		res.send(result);
	});
});

app.get("/images", function(req,res){
	async.map(backends, function iterator(item, callback){
		request.get(item + "/images", function(err,resp,body){
			callback(null, JSON.parse(body));		
		});
	}, function done(err, vms){
		var result = [];
		for(var i in vms){
			for(var j = 0; j < vms[i].length; j++){
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