(function () {
    angular
        .module('MyBookApp')
        .controller('adminBooksController', adminBooksController);

    function adminBooksController(userService, currentUser,$location, bookService) {
        var model = this;
        model.deleteBook = deleteBook;
        model.findAllBooks = findAllBooks;
        model.createBook = createBook;
        model.selectBook = selectBook;
        model.updateBook = updateBook;
        model.currentUser = currentUser;
        model.logout = logout;

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/')
                });
        }


        init();


        function updateBook(book) {
            bookService
                .adminUpdate(book._id, book)
                .then(findAllBooks);
        }

        function selectBook(book) {
             model.book = angular.copy(book);
         }


        function createBook(book) {
            userService
                .findUserByUsername(book._user.username)
                .then(function (user) {
                    bookService
                        .createBook(book, user._id)
                        .then(findAllBooks);
                });
        }

        function deleteBook(book) {
            userService
                .findUserByUsername(book._user.username)
                .then(function (user) {
                    bookService
                        .deleteBook(user._id, book._id)
                        .then(findAllBooks);
                });
        }

        function init() {
            findAllBooks();
        }

        function findAllBooks() {
            bookService
                .findAllBooks()
                .then(function (books) {
                    model.books = books;

                });
        }
    }
})();