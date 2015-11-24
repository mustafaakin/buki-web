///////////////////////////////////////////////////////////////////////////////
/////////////////        controllers         //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var app = angular.module("MyApp");

app.controller("VMsCtrl", function($scope, $http, $interval) {
	$scope.vms = [];
	$scope.reload = function(){
		$scope.lastUpdate = new Date();
		$http.get("/vms").then(function(resp){
			$scope.vms = resp.data;
		})		
	}

	$scope.reload();
	$interval($scope.reload, 1000);

	$scope.stopVM = function(vm){
		$http.post("/vms/stop", {
			host: vm.host,
			name: vm.name
		});
	}

	$scope.startVM = function(vm){
		$http.post("/vms/start", {
			host: vm.host,
			name: vm.name
		});
	}	
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

app.controller("VMCreateCtrl", function($scope, $http) {

});