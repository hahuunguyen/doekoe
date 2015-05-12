'use strict';

angular.module('myApp.deals', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/deals', {
    templateUrl: 'deals/deals.html',
    controller: 'DealsCtrl'
  });
}])

.controller('DealsCtrl', [function() {

}]);