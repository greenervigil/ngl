// --- research --- //	
controllers.controller('researchCtrl', ['$scope', '$modal', 'CorrelationsFactory',
	function ($scope, $modal, CorrelationsFactory) {
		$scope.documents = [];
		$scope.results = [];
		$scope.submitted = false;
		$scope.productMatch = true;
		$scope.getProducts = function(val){
			var data = {};
			data.productName = val;
			data.standardName = $scope.standardText;
			data.documentApplication = 'research';
			return CorrelationsFactory.readDocumentsRefined(data).then(
				function success(results){
					if(results.data.documents.length > 0){
						$scope.productMatch = true;
						$scope.documents = results.data.documents;
	      	}else{
	      		$scope.productMatch = false;
	      		$scope.documents = []
	      	}
	      	var array = getStringArrayWithoutDuplicates(results.data.documents, 'productName');
	      	return array.slice(0, 5);
				}
			);
		};

		$scope.showAllProducts = function(){
			var data = {};
			data.productName = '';
			data.standardName = $scope.standardText;
			data.documentApplication = 'research';
			data.order = 'products';
			CorrelationsFactory.readDocumentsRefined(data).then(
				function success(results){
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
				}
			);
		}

		$scope.submit = function() {
			$scope.submitted = false;
			$scope.submitting = true;
			if(($scope.productText == '' || $scope.productText == undefined) && ($scope.standardText == '' || $scope.standardText == undefined) && $scope.results){
				CorrelationsFactory.readByApplication('documents', 'research').then(
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
				data.documentApplication = 'research';
				CorrelationsFactory.readDocumentsRefined(data).then(
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
			}
		};
	}
]);