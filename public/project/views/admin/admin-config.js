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
                controllerAs: 'model',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when('/admin/user', {
                templateUrl: 'views/admin/templates/admin-users.view.client.html',
                controller: 'adminUsersController',
                controllerAs: 'model',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when('/admin/books', {
                templateUrl: 'views/admin/templates/admin-books.view.client.html',
                controller: 'adminBooksController',
                controllerAs: 'model',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when('/admin/following', {
                templateUrl: 'views/admin/templates/admin-following.view.client.html',
                controller: 'adminFollowingController',
                controllerAs: 'model',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when('/admin/orders', {
                templateUrl: 'views/admin/templates/admin-orders.view.client.html',
                controller: 'adminOrdersController',
                controllerAs: 'model',
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
