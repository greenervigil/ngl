var correlations =  angular.module('correlations', [
	'ngGrid',
	'correlations.controllers',
	'correlations.services',
	'correlations.filters',
	'correlations.directives',
	'ui.bootstrap',
	'ngCookies',
	'ngRoute'
]);
var continueUrl = "";
var exampleAppConfig = {
	/* When set to false a query parameter is used to pass on the auth token.
	 * This might be desirable if headers don't work correctly in some
	 * environments and is still secure when using https. */
	useAuthTokenHeader: true
};
correlations.config(['$routeProvider', '$locationProvider', '$httpProvider',
	function ($routeProvider, $locationProvider, $httpProvider) {
		$locationProvider.html5Mode(true);
		$routeProvider
		  .when('/', {
				templateUrl: 'partials/correlations.html',
				controller: 'correlationsCtrl'
			})
			.when('/research', {
				templateUrl: 'partials/research.html',
				controller: 'researchCtrl'
			})
			.when('/admin', {
				templateUrl: 'partials/admin/admin.html',
				controller: 'adminCtrl'
			})
			.when('/admin/login', {
				templateUrl: 'partials/admin/login.html',
				controller: 'loginCtrl'
			})
			.when('/admin/documents', {
				templateUrl: 'partials/admin/documents.html',
				controller: 'documentsCtrl'
			})
			.when('/admin/products', {
				templateUrl: 'partials/admin/products.html',
				controller: 'productsCtrl'
			})
			.when('/admin/standards', {
				templateUrl: 'partials/admin/standards.html',
				controller: 'standardsCtrl'
			})
			.when('/standard/:standard', {
				templateUrl: 'partials/correlations.html',
				controller: 'correlationsCtrl'
			})
			.when('/country/:standard', {
				templateUrl: 'partials/correlations.html',
				controller: 'correlationsCtrl'
			})
			.when('/state/:standard', {
				templateUrl: 'partials/correlations.html',
				controller: 'correlationsCtrl'
			})
			.otherwise({
				redirectTo: '/'
		});

		/* Register error provider that shows message on failed requests or redirects to login page on
			 * unauthenticated requests */
    $httpProvider.interceptors.push(
    	function ($q, $rootScope, $location) {
        return {
        	'responseError': function(rejection) {
        		var status = rejection.status;
        		var config = rejection.config;
        		var method = config.method;
        		var url = config.url;
        		if (status == 401) {
        			$location.path( "/admin/login" );
        		} else {
        			$rootScope.error = method + " on " + url + " failed with status " + status;
        		}

        		return $q.reject(rejection);
        	}
        };
	    }
    );

    /* Registers auth token interceptor, auth token is either passed by header or by query parameter
     * as soon as there is an authenticated user */
    $httpProvider.interceptors.push(
    	function ($q, $rootScope, $location) {
	      return {
	      	'request': function(config) {
	      		var isRestCall = config.url.indexOf('correlations') >= 0;
	      		if (isRestCall && angular.isDefined($rootScope.authToken)) {
	      			var authToken = $rootScope.authToken;
	      			if (exampleAppConfig.useAuthTokenHeader) {
	      				config.headers['X-Auth-Token'] = authToken;
	      			} else {
	      				config.url = config.url + "?token=" + authToken;
	      			}
	      		}
	      		return config || $q.when(config);
	      	}
	      };
    	}
    );

    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
	}
]).run(function($rootScope, $location, $cookieStore) {

		/* Reset error when a new view is loaded */
		$rootScope.$on('$viewContentLoaded', function() {
			delete $rootScope.error;
		});

		$rootScope.hasRole = function(role) {

			if ($rootScope.user === undefined) {
				return false;
			}

			if ($rootScope.user.roles[role] === undefined) {
				return false;
			}

			return $rootScope.user.roles[role];
		};

		 /* Try getting valid user from cookie or go to login page */
		if($location.path().indexOf("admin") >= 0){
			$rootScope.continueUrl = $location.path();
			var originalPath = $location.path();
			$location.path("/admin/login");
			var authToken = $cookieStore.get('authToken');
			if (authToken !== undefined) {
				$rootScope.authToken = authToken;
				$location.path(originalPath);
			}
		}

		$rootScope.initialized = true;
	});
