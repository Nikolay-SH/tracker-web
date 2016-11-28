angular.module('trackerWebApp')
    .controller('addNewController', function($scope, $http) {
        $scope.issue = {};
        $scope.issue.status = 'OPEN';
        $scope.issue.description = '';
        $scope.status = '#Information';
        $scope.submitForm = function() {
            if (!$scope.issue.summary) {
                $scope.status = 'Summary isn\'t filled!';
                $scope.issue.hash = undefined;
                return;
            }
            $http({
                method    :    'POST',
                url       :    '/api/issues/',
                data      :    $scope.issue
            })
                .success(function(response) {
                    $scope.status = '#' + response.hash;
                    $scope.issue.summary = '';
                    $scope.issue.description = '';
                })
                .error(function(response) {
                    $scope.status = 'Issue didn\'t add.';
                    $scope.issue.hash = undefined;
                    alert(response.message);
                });
        };
    });
