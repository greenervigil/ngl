// --- admin/products --- //
controllers.controller('productsCtrl', ['$rootScope', '$scope', '$location', 'CorrelationsFactory', 
	function ($rootScope, $scope, $location, CorrelationsFactory) {
		$scope.$parent.continueUrl = $location.$$path;
		$scope.corrStyle = {"margin-top" : "auto"}
		var addCount = 0;
		$scope.headerTitle = "Products";
		$scope.gridOptions = { 
			data: 'data',
			columnDefs: [
				{
					field: 'productCode',
					displayName: 'Product Code',
					visible: false,
				},
				{
					field: 'productName',
					displayName: 'Product Name',
					editableCellTemplate: '<input ng-class="\'colt\' + col.index" ng-input="COL_FIELD" maxlength="100" ng-model="COL_FIELD" />'
				},
				{
					field: 'productApplication',
					displayName: 'Product Application',
					enableCellEdit: true,
					editableCellTemplate: '<select ng-class="\'colt\' + col.index" ng-model="COL_FIELD" ng-input="COL_FIELD" ng-options="option.name as option.name for option in correlationsApplications"></select>'
				},
				{
					displayName: '',
					cellTemplate: '<button class="btn btn-success btn-edit" ng-click="createOrUpdate(row)"><i class="icon-save"></i></button>',
					width: 34,
					resizable: false,
					enableCellEdit: false
				},
				{
					displayName: '',
					cellTemplate: '<button class="btn btn-danger btn-delete" ng-click="deleteItem(row)"><i class="icon-trash"></i></button>',
					width: 34,
					resizable: false,
					enableCellEdit: false
				}
			],
			rowTemplate: '<change-row-color row="row" data="data"/><div ng-style="{\'cursor\': row.cursor, \'z-index\': col.zIndex() }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell {{col.cellClass}}" ng-cell></div>',
			multiSelect: false,
			enableCellEdit: true,
			enableRowSelection: true,
			enableCellSelection: true,
			enableCellEditOnFocus: true,
			enableColumnResize: true,
			showFooter: true,
			footerRowHeight: 40,
			sortInfo: {
				fields: [
					'productName'
				],
				directions: [
					'asc'
				]
			}
		};
		
		getNewData($rootScope, $scope, CorrelationsFactory, 'products');

		$scope.createOrUpdate = function(row){
			if(typeof row.entity.add != "undefined" && row.entity.add){
				CorrelationsFactory.create('products', row.entity).then(
					function success(results){
						getNewData($rootScope, $scope, CorrelationsFactory, 'products');
						//row.entity = results.data;
						//findAndReplace($scope.data, "id", row.entity.id, results.data);
					},
					function error(results){
						entity = findEntity($scope.data, 'productCode', row.entity.productCode);
						entity.color = "#FA8072";
					}
				);
			}else{
				CorrelationsFactory.update('products', row.entity).then(
					function success(results){
						getNewData($rootScope, $scope, CorrelationsFactory, 'products');
						//row.entity = results.data;
						//findAndReplace($scope.data, "productCode", row.entity.productCode, results.data);
					},
					function error(results){
						entity = findEntity($scope.data, 'productCode', row.entity.productCode);
						entity.color = "#FA8072";
					}
				);
			}
		};

		$scope.deleteItem = function(row){
			if(typeof row.entity.id != "undefined"){
				findAndRemove($scope.data, "id", row.entity.id);
				$rootScope.addFlag = true;
			}else{
				if(confirm("Are you sure you want to delete \"" + row.entity.documentName + "\"?")){
					CorrelationsFactory.deleteItem('products', row.entity).then(
						function success(results){
							findAndRemove($scope.data, "productCode", row.entity.productCode);
						},
						function error(results){
							if(results.headers()['return-code'].indexOf("Info") > -1){
		          	findAndRemove($scope.data, "productCode", row.entity.productCode);
		        	}
		        	entity = findEntity($scope.data, 'productCode', row.entity.productCode);
							entity.color = "#FA8072";
						}
					);
				}
			}
		};

		$scope.addRow = function(e){
			if($rootScope.addFlag){
					$scope.gridOptions.ngGrid.$viewport.scrollTop(0);
					if($scope.gridOptions.sortInfo.fields[0] != 'productName'){
						$scope.gridOptions.sortBy('productName');
					}
				$scope.data.push({productCode:'', productName:'<new product>', productApplication:'', add:true, id:addCount});
				addCount++;
				$(e.target).prop("disabled", "disabled");
				$rootScope.addFlag = false;
			}
		};
}]);