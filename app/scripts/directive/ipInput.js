;(function(angular){
	angular.module('disasterRec').directive('ipInput',ipInputDrt);
	function ipInputDrt(){
		return{
			restrict:'E',
			scope:{
				ip:'=',
				addipList:'='
			},
			templateUrl:'views/common/ipInput.html',
			controller:['$scope','$timeout',function($scope,$timeout){
				$scope.ip = {a:'',b:'',c:'',d:''};
				$scope.buttonFlag = true;
				$scope.erro=false;
				$scope.addipList = [];
				$scope.changeIp = function(key,id){
					if(($scope.ip[key]||$scope.ip[key]===0)&&$scope.ip[key].indexOf(".")>0&&key!=='d'){
						document.activeElement.nextSibling.nextSibling.focus();
					}
					$scope.ip[key] = $scope.ip[key].replace(/[^0-9]/g, '');
					if(!isNaN($scope.ip[key])){
						if($scope.ip[key]>99){
							if($scope.ip[key]>255){
								$scope.ip[key] = 255;
							}
							if(key!=='d'){
								document.activeElement.nextSibling.nextSibling.focus();
							}
						}
					}
				};
				$scope.blurIp = function(key){
					$scope.ip[key] = parseInt($scope.ip[key]);
					//暂时去掉
					/*if(isNaN($scope.ip[key])){
						$scope.ip[key] = 0;
					}*/
				};
				$scope.$watch('ip',function(nvl){
					if(is.propertyCount(nvl,0)){
						angular.copy({a:'',b:'',c:'',d:''},nvl);
					}
					$scope.ips = '';
					for(var key in nvl){
						if(nvl[key]!==nvl[key]||nvl[key]===undefined||nvl[key]===''){
							$scope.buttonFlag = true;
							return;
						}
						$scope.ips += '.'+nvl[key];
					}
					$scope.buttonFlag = false;
					$scope.ips = $scope.ips.substr(1);
				},true);
				$scope.addIpClick = function(){
					for(var i=0;i<$scope.addipList.length;i++){
						if($scope.ips===$scope.addipList[i]){
							$scope.erro=true;
							$timeout(function(){
								$scope.erro=false;
							},4000);
							return;
						}
					}
					$scope.addipList.push($scope.ips);
					angular.copy({a:'',b:'',c:'',d:''},$scope.ip);
					$scope.buttonFlag = true;
				};
				$scope.removeIP = function(index){
					$scope.addipList.splice(index, 1);
				}
			}]
		}
	}
})(angular);
