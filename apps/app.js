angular.module('myApp', ['ngMessages', 'ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : './home.html',
		controller : 'myCtrl'
	}).when('/new-meal', {
		templateUrl : './new-meal.html',
		controller: 'myCtrl'
	}).when('/my-earnings', {
		templateUrl : './my-earnings.html',
		controller: 'myCtrl'
	});
	// Where does this go??
	// .run(function($rootScope, $location) {
	//     
	// });
}])
.run(function($rootScope, $location){
	$rootScope.tipTotal = 0;
	$rootScope.mealCount = 0;
	$rootScope.avgTip = 0;
	$rootScope.$on('$routeChangeError', function() {
	        $location.path('/');
	    });
})
.controller('myCtrl', function($scope, $rootScope){
	$scope.baseMealPrice = '';
	$scope.taxRateTens = '';
	// $scope.taxRate = $scope.taxRateTens*0.01;
	$scope.test = (8/100);
	$scope.tipPercentTens = '';
	$scope.subTotal = 0;
	$scope.tip = 0;
	$scope.total = 0;
	


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
			$rootScope.tipTotal += mealTip;
			//Increase the meal count
			$rootScope.mealCount += 1;
			//Calculate average tip per meal.
			$rootScope.avgTip = $rootScope.tipTotal / $rootScope.mealCount;
			console.log($rootScope.tipTotal);
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