var app = angular.module("MyAppPanel", ['ngRoute', 'ui.bootstrap', 'chart.js']);

app.config(['$routeProvider', function($routeProvider) {
	var routes = [
		["/panel/status", "StatusCtrl"],
		["/panel/hosts"],
		["/panel/apps", "AppsCtrl"],
		["/panel/vms", "VMCtrl"],
		["/panel/users"],
		["/panel/visual", "VisualCtrl"],
		["/panel/perf", "PerfCtrl"],
		["/panel/portmap"],
		["/panel/rdesktop", "RDesktopCtrl"],
		["/panel/account"],
		["/panel/settings"],		
		["/panel/networks", "NetworkCtrl"],		
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

	$routeProvider.otherwise("/panel/status");
}]);