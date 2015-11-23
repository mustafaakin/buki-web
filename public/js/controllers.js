///////////////////////////////////////////////////////////////////////////////
/////////////////        controllers         //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var app = angular.module("MyApp");

app.controller("VMsCtrl", function($scope, $http) {
	$scope.vms = [];
	$http.get("/vms").then(function(resp){
		$scope.vms = resp.data;
	})
});

app.controller("NetworksCtrl", function($scope, $http) {
	$scope.vms = [];
	$http.get("/networks").then(function(resp){
		$scope.vms = resp.data;
	})
});

app.controller("ImagesCtrl", function($scope, $http) {
	$scope.vms = [];
	$http.get("/images").then(function(resp){
		$scope.vms = resp.data;
	})
});

app.controller("HostsCtrl", function($scope, $http) {
	$scope.vms = [];
	$http.get("/hosts").then(function(resp){
		$scope.vms = resp.data;
	})
});