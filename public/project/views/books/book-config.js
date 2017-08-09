
(function () {
    angular
        .module('MyBookApp')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/home/books', {
                templateUrl: 'views/books/templates/books.view.client.html',
                controller: 'booksSearchController',
                controllerAs: 'model',
                resolve:{
                    currentUser: checkCurrentUser
                }
            })
            .when('/home/books/:bookId', {
                templateUrl: 'views/books/templates/book-info.view.client.html',
                controller: 'bookInfoController',
                controllerAs: 'model',
                resolve:{
                    currentUser: checkCurrentUser
                }
            })
    }


    function checkCurrentUser(userService, $q) {

        var deferred = $q.defer();

        userService.checkLoggedIn()
            .then(function (user) {
                if(user === '0'){
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
})();