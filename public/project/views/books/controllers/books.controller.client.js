(function () {
    angular
        .module('MyBookApp')
        .controller('booksSearchController', booksSearchController);
    
    function booksSearchController(bookService,$location, userService, currentUser) {
        var buyerBooksCtrl = this;

        buyerBooksCtrl.findAllBooks = findAllBooks;
        buyerBooksCtrl.currentUser = currentUser;
        buyerBooksCtrl.renderBooks = renderBooks;
        buyerBooksCtrl.searchBook = searchBook;
        buyerBooksCtrl.logout = logout;
        buyerBooksCtrl.init = init;


        function init() {
            findAllBooks();
            buyerBooksCtrl.message = null;
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
            buyerBooksCtrl.books = books;
        }

        function searchBook(type, searchText) {
            buyerBooksCtrl.books = [];
            buyerBooksCtrl.message = null;

            if (searchText === null || searchText === "" || typeof searchText === 'undefined') {
                bookService
                    .findAllBooks()
                    .then(function (books) {
                        if(books.length !== 0){

                            buyerBooksCtrl.books = books;
                        } else {

                            buyerBooksCtrl.message = "Sorry, no books!"
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

                                buyerBooksCtrl.books = books;
                            } else {

                                buyerBooksCtrl.message = "Sorry, no books match your search!"
                            }
                        });
                    break;
                case "Author":
                    bookService
                        .findBookByAuthor(searchText)
                        .then(function (books) {
                            if(books.length !== 0){

                                buyerBooksCtrl.books = books;
                            } else {

                                buyerBooksCtrl.message = "Sorry, no books match your search!";
                            }
                        });
                    break;
                case "ISBN":
                    bookService
                        .findBookByISBN(searchText)
                        .then(function (books) {
                            if(books.length !== 0){

                                buyerBooksCtrl.books = books;
                            } else {

                                buyerBooksCtrl.message = "Sorry, no books match your search!"
                            }
                        });
                    break;
                default:
                    break;
            }
        }
    }


})();