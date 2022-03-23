var services = angular.module('correlations.services', []);
if (window.location.hostname.toUpperCase().indexOf("S-") != -1 || window.location.hostname.toUpperCase().indexOf("D-") != -1)
  env = "s-";
else if(window.location.hostname.toUpperCase().indexOf("D-") != -1 || window.location.hostname.toUpperCase().indexOf("L-") != -1)
  env = "l-";
else
  env = "";
var serverUrl = env + "ngl.cengage.com";
services.factory('CorrelationsFactory',
  function ($rootScope, $http, $q) {

    var correlationsFactory = {};

    correlationsFactory.loggedIn = function(){
      var deferred = $q.defer();
      $http.get('https://' + serverUrl + '/correlationswebservice/loggedin').
      success(function(data, status, headers, config){
        deferred.resolve(getReturnData(data, status, headers, config));
      }).error(function(data, status, headers, config){
        var results = getReturnData(data, status, headers, config);
        if(headers()["return-code"] != undefined && headers()["return-code"] != "undefined"){
          alert(headers()["return-code"]);
        }else{
        }
        deferred.reject(results);
      });
      return deferred.promise;
    };

    correlationsFactory.login = function(data){
      var deferred = $q.defer();
      $http.post('https://' + serverUrl + '/correlationswebservice/authenticate', data).
      success(function(data, status, headers, config){
        deferred.resolve(getReturnData(data, status, headers, config));
      }).error(function(data, status, headers, config){
        var results = getReturnData(data, status, headers, config);
        if(headers()["return-code"] != undefined && headers()["return-code"] != "undefined"){
          alert(headers()["return-code"]);
        }else{
          alert("An error occured");
        }
        deferred.reject(results);
      });
      return deferred.promise;
    };

    correlationsFactory.read = function(type){
      var deferred = $q.defer();
      $http.get('https://' + serverUrl + '/correlationswebservice/' + type).
      success(function(data, status, headers, config){
        deferred.resolve(getReturnData(data, status, headers, config));
      }).error(function(data, status, headers, config){
        var results = getReturnData(data, status, headers, config);
        if(headers()["return-code"] != undefined && headers()["return-code"] != "undefined"){
          alert(headers()["return-code"]);
        }else{
          alert("An error occured");
        }
        deferred.reject(results);
      });
      return deferred.promise;
    };

    correlationsFactory.readByApplication = function(type, applicaiton){
      var deferred = $q.defer();
      $http.get('https://' + serverUrl + '/correlationswebservice/' + type + "/" + applicaiton).
      success(function(data, status, headers, config){
        deferred.resolve(getReturnData(data, status, headers, config));
      }).
      error(function(data, status, headers, config){
        var results = getReturnData(data, status, headers, config);
        if(headers()["return-code"] != undefined && headers()["return-code"] != "undefined"){
          alert(headers()["return-code"]);
        }else{
          alert("An error occured");
        }
        deferred.reject(results);
      });
      return deferred.promise;
    };

    correlationsFactory.readDocumentsRefined = function(data){
      var deferred = $q.defer();
      $http.post('https://' + serverUrl + '/correlationswebservice/documents/refine', data).
      success(function(data, status, headers, config){
        deferred.resolve(getReturnData(data, status, headers, config));
      }).
      error(function(data, status, headers, config){
        var results = getReturnData(data, status, headers, config);
        if(headers()["return-code"] != undefined && headers()["return-code"] != "undefined"){
          alert(headers()["return-code"]);
        }else{
          alert("An error occured");
        }
        deferred.reject(results);
      });
      return deferred.promise;
    };

    correlationsFactory.searchByType = function(type, data){
      var deferred = $q.defer();
      $http.post('https://' + serverUrl + '/correlationswebservice/' + type + '/search', data).
      success(function(data, status, headers, config){
        deferred.resolve(getReturnData(data, status, headers, config));
      }).
      error(function(data, status, headers, config){
        var results = getReturnData(data, status, headers, config);
        if(headers()["return-code"] != undefined && headers()["return-code"] != "undefined"){
          alert(headers()["return-code"]);
        }else{
          alert("An error occured");
        }
        deferred.reject(results);
      });
      return deferred.promise;
    };

    correlationsFactory.create = function(type, obj){
      var deferred = $q.defer();
      $http.post('https://' + serverUrl + '/correlationswebservice/' + type, obj).
      success(function(data, status, headers, config){
        var results = getReturnData(data, status, headers, config);
        if(headers()["return-code"] != undefined && headers()["return-code"] != "undefined"){
          alert(headers()["return-code"]);
        }
        deferred.resolve(results);
      }).
      error(function(data, status, headers, config) {
        var results = getReturnData(data, status, headers, config);
        if(headers()["return-code"] != undefined && headers()["return-code"] != "undefined"){
          alert(headers()["return-code"]);
        }else{
          alert("An error occured");
        }
        deferred.reject(results);
      });
      return deferred.promise;
    };

    correlationsFactory.update = function(type, obj){
      var deferred = $q.defer();
      $http.put('https://' + serverUrl + '/correlationswebservice/' + type, obj).
      success(function(data, status, headers, config){
        var results = getReturnData(data, status, headers, config);
        if(headers()["return-code"] != undefined && headers()["return-code"] != "undefined"){
          alert(headers()["return-code"]);
        }
        deferred.resolve(results);
      }).
      error(function(data, status, headers, config) {
        var results = getReturnData(data, status, headers, config);
        if(headers()["return-code"] != undefined && headers()["return-code"] != "undefined"){
          alert(headers()["return-code"]);
        }else{
          alert("An error occured");
        }
        deferred.reject(results);
      });
      return deferred.promise;
    };

    correlationsFactory.deleteItem = function(type, obj){
      var deferred = $q.defer();
      $http({
        method:'DELETE',
        url:'https://' + serverUrl + '/correlationswebservice/' + type,
        headers: {'Content-type': 'application/json;charset=UTF-8'},
        data: obj
      }).
      success(function(data, status, headers, config){
        deferred.resolve(getReturnData(data, status, headers, config));
      }).
      error(function(data, status, headers, config) {
        var results = getReturnData(data, status, headers, config);
        if(headers()["return-code"] != undefined && headers()["return-code"] != "undefined"){
          alert(headers()["return-code"]);
        }else{
          alert("An error occured");
        }
        deferred.reject(results);
      });
      return deferred.promise;
    };

    correlationsFactory.createDocument = function($scope, row){
      return uploadFile($scope, 'https://' + serverUrl + '/correlationswebservice/documents', row)
    };

    correlationsFactory.updateDocument = function($scope, row){
      return uploadFile($scope, 'https://' + serverUrl + '/correlationswebservice/documents/update', row);
    };
    uploadFile = function($scope, url, row){
      var deferred = $q.defer();
      var rowElm = $(row.elm)[0];
      var rowBack = null;
      var form = $(rowElm).find("form");

      //$(row.elm).prepend('<div class="progressBar" style="height:100%; width:0; background-color:green" />');
      //rowBack = $(rowElm).find(".progressBar");
      form.ajaxSubmit({
        url: url,
        type: 'POST',
        beforeSend: function(xhr){
          xhr.setRequestHeader("X-Auth-Token", $rootScope.authToken);
        },
        beforeSubmit: function(){
          $(row.elm).prepend('<div class="progress-bar" style="width:0;" />');
          rowBack = $(rowElm).find(".progress-bar");
        },
        uploadProgress: function(event, position, total, percentComplete){
          if(rowBack != null){
            var percent = percentComplete + "%";
            rowBack.css("width", percent);
          }
        },
        success: function (data, status, xhr, $form) {
          alert(xhr.getResponseHeader("return-code"));
          if(rowBack != null){
            rowBack.remove();
          }
          deferred.resolve(data);
          $scope.$apply();
        },
        error: function(xhr, status, reason, $form){
          alert(xhr.getResponseHeader("return-code"));
          if(rowBack != null){
            rowBack.remove();
          }
          deferred.reject(xhr);
          $scope.$apply();
        }
      });
      return deferred.promise;
    };

    return correlationsFactory;
  }
);
