angular.module('myApp', [])
.controller('myCtrl', function($scope){
	$scope.baseMealPrice = '';
	$scope.taxRate = '';
	$scope.tipPercent = '';
	$scope.subTotal = '';
	$scope.tip = '';
	$scope.total = '';
	$scope.tipTotal = '';


	$scope.submit = function(e){
		e.preventDefault();
		console.log($scope.baseMealPrice);
	};
});