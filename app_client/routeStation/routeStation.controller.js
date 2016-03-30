angular
	.module('iBus')
	.controller('routeStationCtrl', routeStationCtrl);

function routeStationCtrl($scope, $log, getRoute, getStop) {
	var station = [];
	var arrpath = [];
	$scope.markers = new Array();
	angular.extend($scope, {
		london: {
			lat: 10.755769,
			lng: 106.713852,
			zoom: 14
		},
		events: {}
	});
	getRoute.listRoute()
		.success(function(data) {
			$scope.routes = data;
			$scope.selectedItem = data[0];
			$scope.update($scope.selectedItem.Id);
		})
		.error(function(error) {
			//$scope.message = error;
		});
	$scope.update = function(id) {
		getStop.listStop(id)
			.success(function(data) {
				station = [];
				$scope.removeMarkers();
				for (var i = data.length - 1; i >= 0; i--) {
					station.push(data[i].Station);
				};

				for (var i = station.length - 1; i >= 0; i--) {
					$scope.markers.push({
						lat: station[i].Lat,
						lng: station[i].Lng,
						message: station[i].Name,
						focus: true
					});
				};
				
				
			})
			.error(function(error) {
				$scope.message = error;
			});
	}
	$scope.removeMarkers = function() {
		$scope.markers = [];
	}
}