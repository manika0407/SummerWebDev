
(function () {
    angular
        .module('MyBookApp')
        .controller('sellerBooksController', sellerBooksController);
    
    function sellerBooksController(bookService, currentUser,$location, userService) {
        var model = this;

        model.userId = currentUser._id;//$routeParams['userId'];
        model.createBook = createBook;
        model.currentUser = currentUser;
        model.logout = logout;

        function init() {
            bookService
                         .findAllBooksForUser(model.userId)
                         .then(renderBooks);

        }
        init();



        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                });
        }



        function renderBooks(books) {
            model.books = books;
        }

        function createBook(userId) {
            var newBook = {
                name : '',
                isbn : '',
                description: ''
            };
            bookService
                .createBook(newBook, userId)
                .then(function (book) {

                    var bookId = book._id;

                    $location.url('/seller/book/'+bookId);
                });
        }
    }

})();