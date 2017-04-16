var cloudapp=angular.module("CloudApp",[]);

cloudapp.controller('cloudCtrl',function ($scope,$http) {
$scope.uploadFile=function (files) {
    var fd = new FormData();
    //Take the first selected file
    fd.append("file", files[0]);
    console.log(fd.filename);
    $http.post('/upload', fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
    }).success(console.log('success') ).error( console.log('error') );

}
    
});