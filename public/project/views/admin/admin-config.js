/**
 * Created by manika on 8/4/17.
 */
/**
 * Created by manika on 8/4/17.
 */
(function () {
    angular
        .module('MyBookApp')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider

            .when('/admin', {
                templateUrl: 'views/admin/templates/admin.view.client.html',
                controller: 'mainController',
                controllerAs: 'mainCtrl',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when('/admin/user', {
                templateUrl: 'views/admin/templates/adminUsers.view.client.html',
                controller: 'adminUsersController',
                controllerAs: 'adminUserCtrl',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when('/admin/books', {
                templateUrl: 'views/admin/templates/adminBooks.view.client.html',
                controller: 'adminBooksController',
                controllerAs: 'adminBookCtrl',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when('/admin/following', {
                templateUrl: 'views/admin/templates/adminFollowing.view.client.html',
                controller: 'adminFollowingController',
                controllerAs: 'adminFollowingCtrl',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when('/admin/orders', {
                templateUrl: 'views/admin/templates/adminOrders.view.client.html',
                controller: 'adminOrdersController',
                controllerAs: 'adminOrderCtrl',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
    }
    function checkLoggedIn(userService, $q, $location) {

        var deferred = $q.defer();

        userService.checkLoggedIn()
            .then(function (user) {
                if(user === '0'){
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    // function checkCurrentUser(userService, $q) {
    //
    //     var deferred = $q.defer();
    //
    //     userService.checkLoggedIn()
    //         .then(function (user) {
    //             if(user === '0'){
    //                 deferred.resolve({});
    //             } else {
    //                 deferred.resolve(user);
    //             }
    //         });
    //     return deferred.promise;
    // }
})();
