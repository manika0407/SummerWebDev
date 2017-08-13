(function () {
    angular
        .module('MyBookApp')
        .controller('bookEditController', bookEditController);

    function bookEditController (bookService,searchService,$routeParams, $location, currentUser,userService) {

        var bookEditCtrl = this;

        bookEditCtrl.user = currentUser;
        bookEditCtrl.userId = currentUser._id;
        bookEditCtrl.bookId = $routeParams.bookId;
        bookEditCtrl.updateBook = updateBook;
        bookEditCtrl.deleteBook = deleteBook;
        bookEditCtrl.currentUser = currentUser;
        bookEditCtrl.logout = logout;


        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                });
        }



        function init() {
            bookService
                .findBookById(bookEditCtrl.bookId)
                .then(function (book) {
                    bookEditCtrl.book = book;
                    bookEditCtrl.preBook = angular.copy(bookEditCtrl.book);
                });
        }

        init();





        function updateBook(bookId, newBook) {
            if (newBook.isbn === null || newBook.isbn  === '' || typeof newBook.isbn  === 'undefined') {
                bookEditCtrl.error1 = 'Either ISBN, Name or Author is required ';
                bookEditCtrl.error2 = null;
                bookEditCtrl.error3 = null;
                bookEditCtrl.submitted1 = true;
                return;
            }

            if (newBook.inventory === null || newBook.inventory === '' || typeof newBook.inventory === 'undefined') {
                bookEditCtrl.error1 = null;
                bookEditCtrl.error2 = 'Inventory is required!';
                bookEditCtrl.error3 = null;
                bookEditCtrl.submitted2 = true;
                return;
            }

            if (newBook.inventory <= 0) {
                bookEditCtrl.error1 = null;
                bookEditCtrl.error2 = 'Inventory must be more than 0 !';
                bookEditCtrl.error3 = null;
                bookEditCtrl.submitted2 = true;
                return;
            }



            if (newBook.price === null || newBook.price === '' || typeof newBook.price === 'undefined') {
                bookEditCtrl.error1 = null;
                bookEditCtrl.error2 = null;
                bookEditCtrl.error3 = 'Price is required!';
                bookEditCtrl.submitted3 = true;
                return;
            }

            if (newBook.price <= 0) {
                bookEditCtrl.error1 = null;
                bookEditCtrl.error2 = null;
                bookEditCtrl.error3 = 'Price of book must not be less than 0 !';
                bookEditCtrl.submitted2 = true;
                return;
            }


            var isbn = newBook.isbn;
            searchService
                .searchBook(isbn)
                .then(function (response) {
                    var item = response.data.items[0].volumeInfo;
                    var book = {
                        name: item.title,
                        photo: item.imageLinks.smallThumbnail,
                        inventory: newBook.inventory,
                        description: newBook.description,
                        isbn: newBook.isbn,
                        isbnno: item.industryIdentifiers[1].identifier,
                        price: newBook.price,
                        _user: bookEditCtrl.userId,
                        authors: item.authors[0]+item.authors[1]
                    };
                    bookService
                        .updateBook(bookId, book)
                        .then(function () {
                            bookEditCtrl.message = "Book Updated Successfully!!";
                            $location.url('/seller/book/'+bookEditCtrl.bookId);
                        });
                }, function (err) {
                    bookEditCtrl.message = "Sorry, We are unable to find this book!"
                    return;
                });


        }

        function deleteBook(bookId) {
            bookService
                .deleteBook(bookEditCtrl.userId, bookId)
                .then(function () {
                    $location.url('/seller/books');
                });
        }

    }
})();