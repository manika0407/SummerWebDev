(function () {
    angular
        .module('MyBookApp')
        .controller('bookEditController', bookEditController);

    function bookEditController (bookService,searchService,$routeParams, $location, currentUser,userService) {

        var model = this;

        model.user = currentUser;
        model.userId = currentUser._id;
        model.bookId = $routeParams.bookId;
        model.updateBook = updateBook;
        model.deleteBook = deleteBook;
        model.currentUser = currentUser;
        model.logout = logout;


        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                });
        }



        function init() {
            bookService
                .findBookById(model.bookId)
                .then(function (book) {
                    model.book = book;
                    model.preBook = angular.copy(model.book);
                });
        }

        init();





        function updateBook(bookId, newBook) {
            if (newBook.isbn === null || newBook.isbn  === '' || typeof newBook.isbn  === 'undefined') {
                model.error1 = 'Either ISBN, Name or Author is required ';
                model.error2 = null;
                model.error3 = null;
                model.submitted1 = true;
                return;
            }

            if (newBook.inventory === null || newBook.inventory === '' || typeof newBook.inventory === 'undefined') {
                model.error1 = null;
                model.error2 = 'Inventory is required!';
                model.error3 = null;
                model.submitted2 = true;
                return;
            }
            if (newBook.price === null || newBook.price === '' || typeof newBook.price === 'undefined') {
                model.error1 = null;
                model.error2 = null;
                model.error3 = 'Price is required!';
                model.submitted3 = true;
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
                        price: newBook.price,
                        _user: model.userId,
                        authors: item.authors[0]+item.authors[1]
                    };
                    bookService
                        .updateBook(bookId, book)
                        .then(function () {
                            model.message = "Book Updated Successfully!!";
                            $location.url('/seller/book/'+model.bookId);
                        });
                }, function (err) {
                    model.message = "Sorry, we cannot find this book!"
                });


        }

        function deleteBook(bookId) {
            bookService
                .deleteBook(model.userId, bookId)
                .then(function () {
                    $location.url('/seller/books');
                });
        }

    }
})();