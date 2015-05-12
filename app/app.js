'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}])
.directive('d3pie', function ($parse) {
      return {
         restrict: 'E',
         replace: true,
         template: '<div id="chart"></div>',
         link: function (scope, element, attrs) {
        //   var data = attrs.data.split(','),
        //   chart = d3.select('#chart')
        //      .append("div").attr("class", "chart")
        //      .selectAll('div')
        //      .data(data).enter()
        //      .append("div")
        //      .transition().ease("elastic")
        //      .style("width", function(d) { return d + "%"; })
        //      .text(function(d) { return d + "%"; });
            var freqData=[
                {State:'AL',freq:{low:4786, mid:1319, high:249}}
                ,{State:'AZ',freq:{low:1101, mid:412, high:674}}
                ,{State:'CT',freq:{low:932, mid:2149, high:418}}
                ,{State:'DE',freq:{low:832, mid:1152, high:1862}}
                ,{State:'FL',freq:{low:4481, mid:3304, high:948}}
                ,{State:'GA',freq:{low:1619, mid:167, high:1063}}
                ,{State:'IA',freq:{low:1819, mid:247, high:1203}}
                ,{State:'IL',freq:{low:4498, mid:3852, high:942}}
                ,{State:'IN',freq:{low:797, mid:1849, high:1534}}
                ,{State:'KS',freq:{low:162, mid:379, high:471}}
            ];
            
            var width = 960,
                height = 500,
                radius = Math.min(width, height) / 2;
            
            var color = d3.scale.ordinal()
                .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
            
            var arc = d3.svg.arc()
                .outerRadius(radius - 10)
                .innerRadius(0);
            
            var pie = d3.layout.pie()
                .sort(null)
                .value(function(d) { return d.population; });
            
            var svg = d3.select("#chart").append("svg")
                .attr("width", width)
                .attr("height", height)
              .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            
            d3.csv("data.csv", function(error, data) {
            
              data.forEach(function(d) {
                d.population = +d.population;
              });
            
              var g = svg.selectAll(".arc")
                  .data(pie(data))
                .enter().append("g")
                  .attr("class", "arc");
            
              g.append("path")
                  .attr("d", arc)
                  .style("fill", function(d) { return color(d.data.age); });
            
              g.append("text")
                  .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                  .attr("dy", ".35em")
                  .style("text-anchor", "middle")
                  .text(function(d) { return d.data.age; });
            
            });
         } 
      };
   });
   
   
