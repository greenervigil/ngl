var filters = angular.module('correlations.filters', []);

filters.filter('nospace', function () {
  return function (value) {
    return (!value) ? '' : value.replace(/ /g, '');
  };
});

filters.filter('pipeToComma', function () {
  return function (value) {
    return (!value) ? '' : value.split("||").join(", ");
  };
});