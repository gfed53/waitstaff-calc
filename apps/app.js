angular.module('myApp', ['ngMessages'])
.controller('myCtrl', function($scope){
	$scope.baseMealPrice = '';
	$scope.taxRateTens = '';
	// $scope.taxRate = $scope.taxRateTens*0.01;
	$scope.test = (8/100);
	$scope.tipPercentTens = '';
	$scope.subTotal = 0;
	$scope.tip = 0;
	$scope.total = 0;
	$scope.tipTotal = 0;
	$scope.mealCount = 0;
	$scope.avgTip = 0;


	$scope.submit = function(){
		if($scope.myForm.$valid) {
			//The field expects you to input an integer for the percentages, therefore we will convert them to fractions.
			var taxRate = $scope.taxRateTens/100,
			tipPercent = $scope.tipPercentTens/100;
			//Combine base meal price and tax to get sub total.
			var mealTax = $scope.baseMealPrice * taxRate;
			$scope.subTotal = ($scope.baseMealPrice+mealTax);
			//Calculate tip from tip percentage and add to subtotal.
			var mealTip = $scope.subTotal * tipPercent;
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

	$scope.cancel = function(){
		$scope.baseMealPrice = '';
		$scope.taxRateTens = '';
		$scope.tipPercentTens = '';
	};

	$scope.reset = function(){
		$scope.baseMealPrice = '';
		$scope.taxRateTens = '';
		$scope.tipPercentTens = '';
		$scope.subTotal = 0;
		$scope.tip = 0;
		$scope.total = 0;
		$scope.tipTotal = 0;
		$scope.mealCount = 0;
		$scope.avgTip = 0;
	};

});