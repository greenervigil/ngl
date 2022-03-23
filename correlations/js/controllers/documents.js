// --- admin/documents --- //
controllers.controller('documentsCtrl', ['$rootScope', '$scope', '$http', '$location', 'CorrelationsFactory', 
	function ($rootScope, $scope, $http, $location, CorrelationsFactory) {
		$scope.$parent.continueUrl = $location.$$path;
		$scope.corrStyle = {"margin-top" : "auto"}
		var addCount = 0;
		$scope.getProducts = function(val, row){
			var data = {};
			data.productName = val;
			if(row.entity.documentApplication == "") {
				data.productApplication = "";
				return CorrelationsFactory.searchByType('products', data).then(
					function success(results){
						var array = getArray(results.data.products, 'productName');
		      	return array.slice(0, 5);
					}
				);
			}else{
				data.productApplication = row.entity.documentApplication;
				return CorrelationsFactory.searchByType('products', data).then(
					function success(results){
						var array = getArray(results.data.products, 'productName');
		      	return array.slice(0, 5);
					}
				);
			}
			
		};

		$scope.getStandards = function(val){
			var data = {};
			data.standardName = val;
			return CorrelationsFactory.searchByType('standards', data).then(
				function success(results){
					var array = getArray(results.data.standards, 'standardName');
	      	return array.slice(0, 5);
				}
			);
		};

		$scope.headerTitle = "Documents";
		$scope.gridOptions = { 
			data: 'data',
			columnDefs: [
				{
					field: 'documentCode',
					displayName: 'Document Code',
					visible: true,
					cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>{{row.getProperty(col.field)}}<input type="hidden" name="documentCode" value="{{row.getProperty(col.field)}}" /></span></div>',
					width: 0
				},
				{
					field: 'documentName',
					displayName: 'Document Name',
					cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>{{row.getProperty(col.field)}}</span><input type="hidden" name="documentName" value="{{row.getProperty(col.field)}}" /></div>',
					editableCellTemplate: '<input ng-class="\'colt\' + col.index" ng-input="COL_FIELD" maxlength="100" ng-model="COL_FIELD" />'
				},
				{
					field: 'documentUri',
					displayName: 'File',
					cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>{{row.getProperty(col.field)}}</span><uploader row="row" data="data"><button class="change-file btn btn-primary btn-xs" >Change</button><input type="file" class="choose-file" name="documentFile" /></button><input type="hidden" value="{{row.getProperty(col.field)}}" name="documentUri" /></div>',
					enableCellEdit: false,
					width: 500
				},
				{
					field: 'productName',
					displayName: 'Product Name',
					cellTemplate: '<input typeahead="product for product in getProducts($viewValue, row) | filter:$viewValue" typeahead-loading="loadingProducts" class="type-ahead" ng-input="COL_FIELD" ng-model="COL_FIELD" name="productName" /><i ng-show="loadingProducts" class="glyphicon glyphicon-refresh"></i>'
				},
				{
					field: 'standardName',
					displayName: 'Standard Name',
					//cellTemplate: '<input typeahead="standard for standard in getStandards($viewValue) | filter:$viewValue" class="type-ahead" typeahead-loading="loadingStandards" ng-input="COL_FIELD" ng-model="COL_FIELD" name="standardName" /><i ng-show="loadingStandards" class="glyphicon glyphicon-refresh"></i>'
					cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>{{row.getProperty(col.field) | pipeToComma}}</span><input type="hidden" name="standardName" value="{{row.getProperty(col.field)}}" /><button select-standards row="row" data="data" class="change-file btn btn-primary btn-xs">Change</button></div>',
					enableCellEdit: false
				},
				{
					field: 'documentApplication',
					displayName: 'Document Application',
					cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>{{row.getProperty(col.field)}}<input type="hidden" name="documentApplication" value="{{row.getProperty(col.field)}}" /></span></div>',
					editableCellTemplate: '<select ng-class="\'colt\' + col.index" ng-model="COL_FIELD" ng-input="COL_FIELD" ng-options="option.name as option.name for option in correlationsApplications" ></select><input type="hidden" name="documentApplication" value="{{row.getProperty(col.field)}}" />'
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
			rowTemplate: '<change-row-color row="row" data="data"/><form enctype="multipart/form-data" accept-charset="UTF-8" name="form"><div ng-style="{ \'cursor\': row.cursor, \'backgroundColor\': \'rgba(0,0,0,0)\' }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" tabindex="{{$index}}" class="ngCell {{col.cellClass}}" ><div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }">&nbsp;</div><div ng-cell></div></div></form>',
			multiSelect: false,
			enableCellEdit: true,
			enableRowSelection: true,
			enableCellSelection: false,
			enableCellEditOnFocus: true,
			enableColumnResize: true,
			showFooter: true,
			footerRowHeight: 40,
			sortInfo: {
				fields: [
					'documentName'
				],
				directions: [
					'asc'
				]
			}
		};

		getNewData($rootScope, $scope, CorrelationsFactory, 'documents');

		$scope.createOrUpdate = function(row){
			if(typeof row.entity.add != "undefined" && row.entity.add){
				CorrelationsFactory.createDocument($scope, row).then(
					function uploadSuccess(results){
						getNewData($rootScope, $scope, CorrelationsFactory, 'documents');
						//row.entity = results;
						//findAndReplace($scope.data, "id", row.entity.id, results);
					},
					function uploadError(results){
						entity = findEntity($scope.data, 'documentCode', row.entity.documentCode);
						entity.color = "#FA8072";
					}
				);
			}else{
				CorrelationsFactory.updateDocument($scope, row).then(
					function success(results){
						getNewData($rootScope, $scope, CorrelationsFactory, 'documents');
						//row.entity = results;
						//findAndReplace($scope.data, "documentCode", row.entity.documentCode, results);
					},
					function error(results){
						entity = findEntity($scope.data, 'documentCode', row.entity.documentCode);
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
					CorrelationsFactory.deleteItem('documents', row.entity).then(
						function success(results){
							findAndRemove($scope.data, "documentCode", row.entity.documentCode);
						},
						function error(results){
							if(results.headers()['return-code'].indexOf("Info") > -1){
		          	findAndRemove($scope.data, "documentCode", row.entity.documentCode);
		        	}
		        	entity = findEntity($scope.data, 'documentCode', row.entity.documentCode);
							entity.color = "#FA8072";
						}
					);
				}
			}
		};

		$scope.addRow = function(e){
			if($rootScope.addFlag){
				$scope.gridOptions.ngGrid.$viewport.scrollTop(0);
				if($scope.gridOptions.sortInfo.fields[0] != 'documentName'){
					$scope.gridOptions.sortBy('documentName');
				}
				$scope.data.push({documentCode:'', documentName:'<new document>', documentUri:'no file chosen', productName:'', standardName:'', documentApplication:'', productCode:'', standardCode:'', add:true, id:addCount});
				addCount += 1;
				$(e.target).prop("disabled", "disabled");
				$rootScope.addFlag = false;
			}
		};
	}
]);

controllers.controller('selectStandardsModal', ['$scope', '$modalInstance', 'modalInfo', 
	function($scope, $modalInstance, modalInfo) {
		$scope.items = modalInfo.standards; 
		$scope.selection = (modalInfo.item == '') ? [] : modalInfo.item.split('||');

		$scope.toggleSelected = function(item){
			var idx = $scope.selection.indexOf(item);
      
      // is currently selected
      if (idx > -1) {
        $scope.selection.splice(idx, 1);
      }
      
      // is newly selected
      else {
        $scope.selection.push(item);
      }
		}

		$scope.selectItem = function (item) {
    	$modalInstance.close(item);
  	};

  	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
  	};

  	$scope.accept = function (selection) {
    	$modalInstance.close(selection);
  	};
	}
]);