'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.deals',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}])
.directive('d3pie', function ($parse) {
      return {
         restrict: 'E',
         replace: true,
        //  template: '<div id="chart"></div>',
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
        
            var dataSet = {
                'Household': [{ category:'food', percentage: 60 }
                    ,{ category:'tool', percentage: 10 }
                    ,{ category:'bathroom', percentage: 10 }
                    ,{ category:'drink', percentage: 20 }],
                'Leisure': [{ category:'dinner', percentage: 20 }
                    ,{ category:'party', percentage: 70 }
                    ,{ category:'others', percentage: 10 }],
                'Travel': [{ category:'HSL', percentage: 30 }
                    ,{ category:'plane', percentage: 60 }
                    ,{ category:'gas', percentage: 10 }],
                'Others': [{ category:'clothing', percentage: 45 }
                    ,{ category:'electronics', percentage: 55 }]
            };
        
            var data= dataSet[attrs.data];
            var width = 450,
                height = 220,
                radius = Math.min(width, height) / 2;
            
            var color = d3.scale.ordinal()
                .range(["#e25668", "#e28956", "#e2cf56", "#aee256", "#68e256", "#56e289", "#56e2cf"]);
            
            var arc = d3.svg.arc()
                .outerRadius(radius * 0.8 )
                .innerRadius(0);
                
            var outerArc = d3.svg.arc()
                .outerRadius( radius * 0.9 )
                .innerRadius( radius * 0.9 );
            
            var pie = d3.layout.pie()
                .sort(null)
                .value(function(d) { return d.percentage; });
            
            var svg = d3.select(element[0]).append("svg")
                .attr("width", width)
                .attr("height", height)
              .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
                
            svg.append("g")
            	.attr("class", "labels");
                svg.append("g")
            	.attr("class", "lines");
            
              var g = svg.selectAll(".arc")
                  .data(pie(data))
                .enter().append("g")
                  .attr("class", "arc");
            
              g.append("path")
                  .attr("d", arc)
                  .style("fill", function(d) { return color(d.data.category); });
                
                /* ------- TEXT LABELS -------*/

            	var text = svg.select(".labels").selectAll("text")
            		.data(pie(data), function (d) {
            		    return d.data.category;
            		} );
            
            	text.enter()
            		.append("text")
            		.attr("dy", ".35em")
            		.text(function(d) {
            			return d.data.category;
            		});
            	
            	function midAngle(d){
            		return d.startAngle + (d.endAngle - d.startAngle)/2;
            	}
            
            	text.transition().duration(1000)
            		.attrTween("transform", function(d) {
            			this._current = this._current || d;
            			var interpolate = d3.interpolate(this._current, d);
            			this._current = interpolate(0);
            			return function(t) {
            				var d2 = interpolate(t);
            				var pos = outerArc.centroid(d2);
            				pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
            				return "translate("+ pos +")";
            			};
            		})
            		.styleTween("text-anchor", function(d){
            			this._current = this._current || d;
            			var interpolate = d3.interpolate(this._current, d);
            			this._current = interpolate(0);
            			return function(t) {
            				var d2 = interpolate(t);
            				return midAngle(d2) < Math.PI ? "start":"end";
            			};
            		});
            
            	text.exit()
            		.remove();
            
            	/* ------- SLICE TO TEXT POLYLINES -------*/
            
            	var polyline = svg.select(".lines").selectAll("polyline")
            		.data(pie(data), function(d) {
            		    return d.data.category;
            		});
            	
            	polyline.enter()
            		.append("polyline");
            
            	polyline.transition().duration(1000)
            		.attrTween("points", function(d){
            			this._current = this._current || d;
            			var interpolate = d3.interpolate(this._current, d);
            			this._current = interpolate(0);
            			return function(t) {
            				var d2 = interpolate(t);
            				var pos = outerArc.centroid(d2);
            				pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
            				return [arc.centroid(d2), outerArc.centroid(d2), pos];
            			};			
            		});
            	
            	polyline.exit()
            		.remove();
            
         } 
      };
   });
   
   
