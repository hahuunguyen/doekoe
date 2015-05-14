'use strict';

angular.module('myApp.deals', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/deals', {
    templateUrl: 'deals/deals.html',
    controller: 'DealsCtrl'
  });
}])

.controller('DealsCtrl', ['$scope', '$http', function ($scope, $http) {
      $http.get('data/data.json')
          .success(function (data, status, headers, config) {
            $scope.deals = data.deals;
          })
          .error(function (data, status, headers, config) {
            // log error
          });
    }]);