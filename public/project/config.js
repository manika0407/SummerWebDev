(function () {
    angular
        .module('BookAppMaker')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl: 'views/home/templates/home.html'
            })
            .when('/seller/home',{
                templateUrl: 'views/home/templates/seller-home.html'
            })
            .when('/buyer/home',{
                templateUrl: 'views/home/templates/buyer-home.html'
            })
            .when('/login',{
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register',{
                templateUrl: 'views/user/templates/register.view.client.html'
                // controller: 'registerController',
                // controllerAs: 'model'
            })
            .when('/home/books',{
                templateUrl: 'views/books/templates/books.html'
            })
            .when('/books/list/seller/:sellerId',{
                templateUrl: 'views/buyer/templates/buyer-seller-books.view.client.html'
            })
            .when('/buyer/following',{
                templateUrl: 'views/buyer/templates/buyer-following.view.client.html'
            })
            .when('/buyer/books',{
                templateUrl: 'views/buyer/templates/buyer-books.view.client.html'
            })
            .when('/seller/header/books',{
                templateUrl: 'views/seller/templates/seller-books-header.view.client.html'
            })
            .when('/home/books/:bookId',{
                templateUrl: 'views/books/templates/book-info.view.client.html'
            })
            .when('/buyer/books/:bookId',{
                templateUrl: 'views/buyer/templates/buyer-book-info.view.client.html'
            })
            .when('/seller/books/:bookId',{
                templateUrl: 'views/seller/templates/seller-book-info.view.client.html'
            })
            .when('/operation',{
                templateUrl: 'views/home/templates/operationhome.html'
            })
            .when('/search/:text',{
                templateUrl: 'views/home/templates/search.view.client.html'
            })
            .when('/profile/buyer',{
                templateUrl: 'views/buyer/templates/buyer-profile.view.client.html'
            })
            .when('/profile/seller',{
                templateUrl: 'views/seller/templates/seller-profile.view.client.html'
            })
            .when('/seller/books',{
                templateUrl: 'views/seller/templates/seller-books.view.client.html'
            })
            .when('/seller/orders',{
                templateUrl: 'views/seller/templates/seller-orders.view.client.html'
            })
            .when('/seller/orders/message/:orderId',{
                templateUrl: 'views/seller/templates/seller-orders-message.view.client.html'
            })
            .when('/buyer/orders',{
                templateUrl: 'views/buyer/templates/buyer-orders.view.client.html'
            })
            .when('/seller/book/:bookId',{
                templateUrl: 'views/seller/templates/book-edit.view.client.html'
            })

    }
})();