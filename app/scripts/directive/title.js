;(function(){
	'use strict';
	angular.module('disasterRec')
	.directive('titleDrt',titleDrt);
	function titleDrt (){
		return {
			restrict:'EA',
			templateUrl:'views/common/title.html',
			//replace:true,
			transclude:true,
			scope:{
				user:'='
			},
			controller:['$scope','$filter','$element',function($scope,$filter,$element){
				$scope.showRemark=function(){
					var win,x,y,td;
					win = document.getElementById('remark');
					td = $element.parent()[0];
					x = td.offsetLeft+$("#main-menu").width()+td.offsetWidth+15;
					y = td.offsetTop+120-$('#tbody')[0].scrollTop;
					document.getElementById('remarkText').innerHTML = $filter('indexDirFil')($scope.user.index);
					win.style.display = 'block';
					win.style.top = y+'px';
					win.style.left = x+'px';
				};
				$scope.hiddenRemark = function(){
					document.getElementById('remark').style.display = 'none';
				}
			}],
		};
	}
})();
