myApp.controller('CheckInsController', ['$scope', '$rootScope', '$firebaseObject',
    '$firebaseArray', '$routeParams', '$location', function($scope, $rootScope, $firebaseObject, $firebaseArray, $routeParams, $location) {

            var ref, checkinsList;

        $scope.whichmeeting = $routeParams.mId;
        $scope.whichuser = $routeParams.uId;
            // this comes from the URL. in the app.js file, a router was created that referenced checkins/:uId/:mId.
            // The mId parameter from the URL is what needs to be called from this scope declaration.

        ref = firebase.database().ref()
            .child('users').child($scope.whichuser)
            .child('meetings').child($scope.whichmeeting)
            .child('checkins');

        checkinsList = $firebaseArray(ref);
        $scope.checkins = checkinsList;

        $scope.order = 'firstname';
        $scope.direction = null;
        $scope.query = '';
        $scope.recordId= '';

        $scope.pickRandom = function() {
            var whichRecord = Math.round(Math.random() * (checkinsList.length - 1));
            $scope.recrodId = checkinsList.$keyAt(whichRecord);
        } // pick a random user

        $scope.addCheckIn = function() {

            $firebaseArray(ref).$add({
                firstname: $scope.user.firstname,
                lastname: $scope.user.lastname,
                email: $scope.user.email,
                date: firebase.database.ServerValue.TIMESTAMP
            }).then(function() {
                $location.path('/checkins/' + $scope.whichuser + '/' + $scope.whichmeeting + '/checkinsList')
            }); //$add
        }  //addCheckIn

        $scope.deleteCheckIn = function(id) {
            var refDel = ref.child(id);
            var record = $firebaseObject(refDel);
            record.$remove(id);
        }

    }]); //myApp.controller