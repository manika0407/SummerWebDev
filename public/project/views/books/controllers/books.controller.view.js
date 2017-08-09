(function () {
    angular
        .module('MyBookApp')
        .controller('booksSearchController', booksSearchController);
    
    function booksSearchController(bookService,$location, userService, currentUser) {
        var model = this;

        // model.userId = currentUser._id;//$routeParams['userId'];
        model.findAllBooks = findAllBooks;
        model.currentUser = currentUser;
        model.renderBooks = renderBooks;
        model.searchBook = searchBook;
        model.logout = logout;
        model.init = init;


        function init() {
            findAllBooks();
            model.message = null;
        }

        init();







        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                });
        }



        function findAllBooks() {
            bookService
                .findAllBooks()
                .then(renderBooks);
        }

        function renderBooks(books) {
            model.books = books;
        }

        function searchBook(type, searchText) {
            model.books = [];
            model.message = null;

            if (searchText === null || searchText === "" || typeof searchText === 'undefined') {
                bookService
                    .findAllBooks()
                    .then(function (books) {
                        if(books.length !== 0){

                            model.books = books;
                        } else {

                            model.message = "Sorry, no books!"
                        }
                    });
                return
            }

            switch (type) {

                case "Name":
                    bookService
                        .findBookByName(searchText)
                        .then(function (books) {
                            if(books.length !== 0){

                                model.books = books;
                            } else {

                                model.message = "Sorry, no books match your search!"
                            }
                        });
                    break;
                case "Author":
                    bookService
                        .findBookByAuthor(searchText)
                        .then(function (books) {
                            if(books.length !== 0){

                                model.books = books;
                            } else {

                                model.message = "Sorry, no books match your search!";
                            }
                        });
                    break;
                case "ISBN":
                    bookService
                        .findBookByISBN(searchText)
                        .then(function (books) {
                            if(books.length !== 0){

                                model.books = books;
                            } else {

                                model.message = "Sorry, no books match your search!"
                            }
                        });
                    break;
                default:
                    break;
            }
        }
    }


})();