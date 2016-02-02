angular.module('myApp', ['ngMessages'])
.controller('myCtrl', function($scope){
	$scope.baseMealPrice = '';
	$scope.taxRate = '';
	$scope.tipPercent = '';
	$scope.subTotal = 0;
	$scope.tip = 0;
	$scope.total = 0;
	$scope.tipTotal = 0;
	$scope.mealCount = 0;
	$scope.avgTip = 0;


	$scope.submit = function(){
		console.log($scope.baseMealPrice);
		var mealTax = $scope.baseMealPrice * $scope.taxRate;
		$scope.subTotal = ($scope.baseMealPrice+mealTax);
		var mealTip = $scope.subTotal * $scope.tipPercent;
		$scope.tip = mealTip;
		$scope.total = ($scope.subTotal+mealTip);
	};
});