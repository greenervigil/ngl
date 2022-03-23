
function findAndRemove(array, property, value) {
   $.each(array, function(index, result) {
      if(result[property] == value) {
          //Remove from array
          array.splice(index, 1);
          return false;
      }    
   });
   return array;
}

function findAndReplace(array, property, value, obj) {
   $.each(array, function(index, result) {
      if(result[property] == value) {
          //Remove from array
          array[index] = obj;
          return false;
      }    
   });
   return array;
}

function findEntity(array, property, value) {
	var entity;
  $.each(array, function(index, result) {
    if(result[property] == value) {
      //Remove from array
      entity = result;
      return false;
    }    
  });
  return entity;
}

function findIndex(array, property, value) {
	var index;
	
  $.each(array, function(i, result) {
    if(result[property] == value) {
      //Remove from array
      index = i;
      return false;
    }    
  });
  return index;
}

function getArray(array, key){
	var newArray = [];
	angular.forEach(array, function(item){
  	newArray.push(item[key]);
	});
	return newArray;
}

function getStringArrayWithoutDuplicates(array, key){
	var uniqueNames = [];
	$.each(array, function(i, el){
	    if($.inArray(el[key], uniqueNames) === -1) uniqueNames.push(el[key]);
	});
	return uniqueNames;
}

function getObjectArrayWithoutDuplicates(array, key){
	var uniqueNames = [];
	var uniqueArray = [];
	$.each(array, function(i, el){
	    if($.inArray(el[key], uniqueNames) === -1) {
	    	uniqueNames.push(el[key]);
	    	uniqueArray.push(el);
	    }
	});
	return uniqueArray;
}

function getNewData($rootScope, $scope, CorrelationsFactory, type, complete){
  $rootScope.addFlag = true;
	CorrelationsFactory.read(type).then(
		function success(results){
			$scope.data = results.data[type];
			if(complete != 'undefined' && complete != undefined){
				complete();
			}
		}
	);
}


function getReturnData(data, status, headers, config) {
    var results = [];
    results.data = data;
    results.status = status;
    results.headers = headers;
    results.config = config;
    return results;
  }