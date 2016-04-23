angular.module('myApp', ['ngMessages', 'ngRoute', 'ngAnimate'])
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
}])
.run(function($rootScope, $location, $timeout){
	$rootScope.tipTotal = 0;
	$rootScope.mealCount = 0;
	$rootScope.avgTip = 0;
	$rootScope.$on('$routeChangeError', function() {
		$location.path('/');
	});
	$rootScope.$on('$routeChangeStart', function() {
		$rootScope.isLoading = true;
	});
	$rootScope.$on('$routeChangeSuccess', function() {
		$timeout(function() {
			$rootScope.isLoading = false;
		}, 1000);
	});
})
.controller('myCtrl', function($scope, $timeout, $rootScope){
	$scope.baseMealPrice = '';
	$scope.taxRateTens = '';
	$scope.test = (8/100);
	$scope.tipPercentTens = '';
	$scope.subTotal = 0;
	$scope.tip = 0;
	$scope.total = 0;

	$scope.submit = function(){
		if($scope.myForm.$valid) {
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
		$rootScope.tipTotal = 0;
		$rootScope.mealCount = 0;
		$rootScope.avgTip = 0;
	};
	//So MDL can work
	$scope.$on('$viewContentLoaded', () => {
		$timeout(() => {
			componentHandler.upgradeAllRegistered();
		})
	});
});