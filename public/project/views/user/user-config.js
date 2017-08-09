/**
 * Created by manika on 8/4/17.
 */
(function () {
    angular
        .module('MyBookApp')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'registerController',
                controllerAs: 'model'
            })

            //buyer
            .when('/books/list/seller/:sellerId', {
                templateUrl: 'views/user/templates/buyer-seller-books.view.client.html',
                controller: 'sellerBooksListController',
                controllerAs: 'model',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when('/buyer/following', {
                templateUrl: 'views/user/templates/buyer-following.view.client.html',
                controller: 'buyerFollowingController',
                controllerAs: 'model',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when('/buyer/books', {
                templateUrl: 'views/user/templates/buyer-books.view.client.html',
                controller: 'booksSearchController',
                controllerAs: 'model',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when('/buyer/books/:bookId', {
                templateUrl: 'views/user/templates/buyer-book-info.view.client.html',
                controller: 'bookInfoController',
                controllerAs: 'model',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when('/profile/buyer',{
                templateUrl: 'views/user/templates/buyer-profile.view.client.html',
                controller:'profileController',
                controllerAs: 'model',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })

            .when('/buyer/orders',{
                templateUrl: 'views/user/templates/buyer-orders.view.client.html',
                controller:'buyerOrdersController',
                controllerAs: 'model',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            // seller

            .when('/seller/header/books', {
                templateUrl: 'views/user/templates/seller-books-header.view.client.html',
                controller: 'booksSearchController',
                controllerAs: 'model',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })



            .when('/seller/books/:bookId', {
                templateUrl: 'views/user/templates/seller-book-info.view.client.html',
                controller: 'bookInfoController',
                controllerAs: 'model',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })

            .when('/profile/seller',{
                templateUrl: 'views/user/templates/seller-profile.view.client.html',
                controller:'profileController',
                controllerAs: 'model',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })

            .when('/seller/books',{
                templateUrl: 'views/user/templates/seller-books.view.client.html',
                controller:'sellerBooksController',
                controllerAs: 'model',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when('/seller/orders',{
                templateUrl: 'views/user/templates/seller-orders.view.client.html',
                controller:'sellerOrdersController',
                controllerAs: 'model',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })
            .when('/seller/orders/message/:orderId',{
                templateUrl: 'views/user/templates/seller-orders-message.view.client.html',
                controller:'sellerOrdersMessageController',
                controllerAs: 'model',
                resolve:{
                    currentUser: checkLoggedIn
                }
            })

            .when('/seller/book/:bookId',{
                templateUrl: 'views/user/templates/seller-book-edit.view.client.html',
                controller: 'bookEditController',
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