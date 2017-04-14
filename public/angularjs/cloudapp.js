var cloudapp=angular.module("CloudApp",[]);

cloudapp.controller('cloudCtrl',function ($scope,$http) {
$scope.uploadFile=function () {
   $http({
       method: 'POST',
       url: '/upload',

   })
}
    
});