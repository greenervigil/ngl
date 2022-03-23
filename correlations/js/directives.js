var directives = angular.module('correlations.directives', []);

directives.directive('uploader', function () {
  return {
    restrict: 'E',
    scope: {
      row: "=",
      data: "="
    },
    link: function(scope, element, attrs) {  
      element.find("button").bind("click", function(){
        element.find("input")[0].click();
        element.find("input").bind("change",function(){
          if(typeof scope.row.entity.id != "undefined"){
            scope.data[findIndex(scope.data, 'id', scope.row.entity.id)].documentUri = $(this).val().split('\\').pop();
          }else{
            scope.data[findIndex(scope.data, 'documentCode', scope.row.entity.documentCode)].documentUri = $(this).val().split('\\').pop();
          }
          scope.$apply();
        });
      });
    }
  }
});

directives.directive('changeRowColor', function () {
  return {
    restrict: 'A',
    scope: {
      row: "=",
      data: "="
    },
    link: function(scope, element, attrs) {  
      scope.$watch("row.entity.color", function() {
        if(typeof scope.row.entity.color != "undefined"){
          $(element).parent(".ngRow").css("background-color", entity.color);
        }else{
          $(element).parent(".ngRow").css("background-color", "");
        }
      }, true);
     
    }
  }
});

directives.directive('addButton', ['$rootScope', function ($rootScope) {
  return {
    restrict: 'EA',
    link: function(scope, element, attrs) {  
      $rootScope.$watch("addFlag", function() {
        if($rootScope.addFlag){
          $(element).removeAttr("disabled");
        }else if(!$rootScope.addFlag){
          $(element).prop("disabled", "disabled");
        }
      }, true);
    }
  }
}]);

directives.directive('selectStandards', ['$rootScope', 'CorrelationsFactory', '$modal', function ($rootScope, CorrelationsFactory, $modal) {
  return {
    restrict: 'A',
    scope: {
      row: "=",
      data: "="
    },
    link: function(scope, element, attrs) {  
      element.bind("click", function(){
        var standard;
        if(typeof scope.row.entity.id != "undefined"){
          standard = scope.data[findIndex(scope.data, 'id', scope.row.entity.id)];
        }else{
          standard = scope.data[findIndex(scope.data, 'documentCode', scope.row.entity.documentCode)];
        }
        scope.submitting = true;
        CorrelationsFactory.read('standards').then(
          function success(results){
            scope.submitting = false;
            var modalInstance = $modal.open({
              templateUrl: 'partials/modals/select-standards-modal.html',
              controller: 'selectStandardsModal',
              resolve: {
                modalInfo: function () {
                  var data = {
                    item: standard.standardName,
                    standards: results.data.standards
                  }
                  return data;
                }
              }
            });

            modalInstance.result.then(function (selectedItem) {
              console.log(selectedItem);
              if(typeof scope.row.entity.id != "undefined"){
                scope.data[findIndex(scope.data, 'id', scope.row.entity.id)].standardName = selectedItem.join("||");
              }else{
                scope.data[findIndex(scope.data, 'documentCode', scope.row.entity.documentCode)].standardName = selectedItem.join("||");
              }
              //scope.$apply();
            });
          },
          function error(results){
            scope.submitting = false;
          }
        );
      });
    }
  }
}]);