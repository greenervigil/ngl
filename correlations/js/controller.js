
var controllers = angular.module('correlations.controllers', []);

// --- index controller --- //
controllers.controller('appCtrl', ['$scope', '$location', 
	function ($scope, $location) {		
		$scope.correlationsApplications = [
			{name:'correlations'},
			{name:'research'}
		]
		$scope.navigationHtml = "partials/admin/navigation.html";
		$scope.headerHtml = "partials/admin/header.html";
		$scope.addFlag = true;		
}]);

controllers.controller('correlationsModal', ['$scope', '$modalInstance', 'modalInfo', 
	function($scope, $modalInstance, modalInfo) {
		$scope.items = modalInfo; 
		$scope.state = false;
		$scope.standard = false;
		$scope.country = false;
		
		angular.forEach(modalInfo, function(obj, index){
      if(obj.standardType == 'State'){
				$scope.state = true;	
	    }else if(obj.standardType == 'International'){
	    	$scope.country = true;
	    }else if(obj.standardType == 'National/Non-State'){
	    	$scope.standard = true;
	    }
    });

		$scope.selectItem = function (item) {
    	$modalInstance.close(item);
  	};

  	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
  	};
	}
]);

// --- admin --- //
controllers.controller('adminCtrl', ['$scope', 
	function ($scope) {
				$scope.headerTitle = "Admin";

	}
]);

// --- admin/login --- //
controllers.controller('loginCtrl', ['$rootScope', '$scope', '$cookieStore', '$location', 'CorrelationsFactory', 
	function ($rootScope, $scope, $cookieStore, $location, CorrelationsFactory) {
		$scope.doLogin = function() {
			var data = {};
			data.password = $scope.password;
			data.username = $scope.username;
			CorrelationsFactory.login(data).then(
				function success(results){
					var authToken = results.data.token;
					$rootScope.authToken = authToken;
					$cookieStore.put('authToken', authToken);
					$location.path($scope.$parent.continueUrl);
				}
			)	
		};
	}
]);
