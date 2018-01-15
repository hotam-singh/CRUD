angular.module('userControllers', [], function($httpProvider) {
    //$httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
})

.config(function() {
    console.log('testing new controller');
})

.controller('registerController', function($scope, $http) {
    this.regsiterNewUser = function(regData) {
        $scope.regData = {};
        $scope.regData = this.regData;
        $http.post('/register', $scope.regData)
        .then(function(resp) {
            console.log('resp.data.error ' + resp.data.error);
            if(resp.data.error) {
                $scope.errorMessage = resp.data.message
            }else {
                $scope.successMessage = resp.data.message 
            }
        });
    }
});