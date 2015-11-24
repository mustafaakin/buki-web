var app = angular.module("MyApp", ['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider', function($routeProvider) {
	var routes = [
		["/home"],
		["/login"],
		["/hosts", "HostsCtrl"],
		["/vms", "VMsCtrl"],
		["/images", "ImagesCtrl"],
		["/networks", "NetworksCtrl"],
		["/vm/create", "VMCreateCtrl"],		
	];

	for (var i in routes) {
		var r = routes[i];

		if (r.length == 1) {
			$routeProvider.when(r[0], {
				templateUrl: 'partials/' + r[0] + ".html",
			});
		} else if (r.length == 2) {
			$routeProvider.when(r[0], {
				templateUrl: 'partials/' + r[0] + ".html",
				controller: r[1]
			});
		}
	}

	$routeProvider.otherwise("/home");
}]);