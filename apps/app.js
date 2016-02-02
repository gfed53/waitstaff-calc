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
		if($scope.myForm.$valid) {
			//Combine base meal price and tax to get sub total.
			var mealTax = $scope.baseMealPrice * $scope.taxRate;
			$scope.subTotal = ($scope.baseMealPrice+mealTax);
			//Calculate tip from tip percentage and add to subtotal.
			var mealTip = $scope.subTotal * $scope.tipPercent;
			$scope.tip = mealTip;
			$scope.total = ($scope.subTotal+mealTip);
			//Add the meal's tip to tip total.
			$scope.tipTotal += mealTip;
			//Increase the meal count
			$scope.mealCount += 1;
			//Calculate average tip per meal.
			$scope.avgTip = $scope.tipTotal / $scope.mealCount;
		}								
	};
});