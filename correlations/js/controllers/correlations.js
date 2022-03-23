// --- correlations --- //
controllers.controller('correlationsCtrl', ['$scope', '$modal', '$location', '$anchorScroll','$routeParams', 'CorrelationsFactory',
	function ($scope, $modal, $location, $anchorScroll, $routeParams, CorrelationsFactory) {
		$scope.documents = [];
		$scope.results = [];
		$scope.productMatch = true;
		$scope.standardMatch = true;
		$scope.getProducts = function(val){
			var data = {};
			data.productName = val;
			data.standardName = $scope.standardText;
			data.documentApplication = 'correlations';
			return CorrelationsFactory.readDocumentsRefined(data).then(
				function success(results){
					if(results.data.documents.length > 0){
						$scope.productMatch = true;
						$scope.documents = results.data.documents;
	      	}else{
	      		$scope.productMatch = false;
	      		$scope.documents = []
	      	}
	      	var array =  getStringArrayWithoutDuplicates(results.data.documents, 'productName');
	      	return array.slice(0, 5);
				}
			);
		};

		$scope.getStandards = function(val){
			var data = {};
			data.productName = $scope.productText;
			data.standardName = val;
			data.documentApplication = 'correlations';
			return CorrelationsFactory.readDocumentsRefined(data).then(
				function success(results){
					if(results.data.documents.length > 0){
						$scope.standardMatch = true;
						$scope.documents = results.data.documents;
	      	}else{
	      		$scope.standardMatch = false;
	      		$scope.documents = [];
	      	}
	      	var array = getStringArrayWithoutDuplicates(results.data.documents, 'standardName');
	      	return array.slice(0, 5);
				}
			);
		};

		$scope.showAllProducts = function(){
			var data = {};
			data.productName = '';
			data.standardName = $scope.standardText;
			data.documentApplication = 'correlations';
			data.order = 'products';
			$scope.submitting = true;
			CorrelationsFactory.readDocumentsRefined(data).then(
				function success(results){
					$scope.submitting = false;
					var modalInstance = $modal.open({
			      templateUrl: 'partials/modals/products-modal.html',
			      controller: 'correlationsModal',
			      resolve: {
			        modalInfo: function () {
			          return getObjectArrayWithoutDuplicates(results.data.documents, 'productName');
			        }
			      }
			    });

			    modalInstance.result.then(function (selectedItem) {
			    	$scope.productText = selectedItem;
			    });
				},
				function error(results){
					$scope.submitting = false;
				}
			);
		}

		$scope.showAllStandards = function(){
			var data = {};
			data.productName = $scope.productText;
			data.standardName = '';
			data.documentApplication = 'correlations';
			data.order = 'standards';
			$scope.submitting = true;
			CorrelationsFactory.readDocumentsRefined(data).then(
				function success(results){
					$scope.submitting = false;
					var modalInstance = $modal.open({
			      templateUrl: 'partials/modals/standards-modal.html',
			      controller: 'correlationsModal',
			      resolve: {
			        modalInfo: function () {
			          return getObjectArrayWithoutDuplicates(results.data.documents, 'standardName');
			        }
			      }
			    });

			    modalInstance.result.then(function (selectedItem) {
			    	$scope.standardText = selectedItem;
			    });
				},
				function error(results){
					$scope.submitting = false;
				}
			);
		}

		$scope.submit = function() {
			$scope.submitted = false;
			$scope.submitting = true;
			if(($scope.productText == '' || $scope.productText == undefined) && ($scope.standardText == '' || $scope.standardText == undefined) && $scope.results){
				CorrelationsFactory.readByApplication('documents', 'correlations').then(
					function success(results){
						$scope.results = results.data.documents;
						$scope.submitted = true;
						$scope.submitting = false;
					},
					function error(results){
						$scope.submitted = true;
						$scope.submitting = false;
					}
				);
			}else{
				var data = {};
				data.productName = $scope.productText;
				data.standardName = $scope.standardText;
				data.documentApplication = 'correlations';
				CorrelationsFactory.readDocumentsRefined(data).then(
					function success(results){
		      	$scope.results = results.data.documents;
		      	$scope.submitted = true;
		      	$scope.submitting = false;
					},
					function error(results) {
						$scope.submitted = true;
						$scope.submitting = false;
					}
				);
			}
		};
		// Deep links for Standards
		// Uses routeParams to grab path variables.
		// Injects them into standardText input box.
		// Calls submit to get related results.
		// see app.js RouteProvider for :standards path variable.
		if($routeParams.standard != undefined){
			$scope.standardText = $routeParams.standard.replace(/-/g, ' ');
			$scope.submit();
		}
	}
]);
