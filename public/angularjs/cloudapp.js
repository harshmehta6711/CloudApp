var cloudapp=angular.module("CloudApp",[]);

cloudapp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

cloudapp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })

            .success(function(){
            })

            .error(function(){
            });
    }
}]);


cloudapp.controller('cloudCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){
    $scope.uploadFile = function(){
        var file = $scope.myFile;

        console.log('file is ' );
        console.dir(file);

        var uploadUrl = "/upload";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };
}]);




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