
(function () {
    angular
        .module('MyBookApp')
        .controller('sellerBooksController', sellerBooksController);
    
    function sellerBooksController(bookService, currentUser,$location, userService) {
        var sellerBookCtrl = this;

        sellerBookCtrl.userId = currentUser._id;
        sellerBookCtrl.createBook = createBook;
        sellerBookCtrl.currentUser = currentUser;
        sellerBookCtrl.logout = logout;

        function init() {
            bookService
                         .findAllBooksForUser(sellerBookCtrl.userId)
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
            sellerBookCtrl.books = books;
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