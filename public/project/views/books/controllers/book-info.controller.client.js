
(function () {
    angular
        .module('MyBookApp')
        .controller('bookInfoController', bookInfoController);

    function bookInfoController ($routeParams, bookService, $location, searchService,currentUser, userService,orderService) {

        var bookInfoCtrl = this;

        bookInfoCtrl.bookId = $routeParams['bookId'];
        bookInfoCtrl.searchBook = searchBook;
        bookInfoCtrl.googleSearch = googleSearch;
        bookInfoCtrl.currentUser = currentUser;
        bookInfoCtrl.logout = logout;
        bookInfoCtrl.userId = currentUser._id;
        bookInfoCtrl.createOrder = createOrder;


        function init() {
            searchBook(bookInfoCtrl.bookId);
        }
        init();








        function createOrder(order, userId, bookId) {
            if (order.venmo === null || order.venmo === '' || typeof order.venmo === 'undefined') {
                bookInfoCtrl.error1 = "Address is required For Shipping Purposes!";
                bookInfoCtrl.error2 = null;
                bookInfoCtrl.submitted1 = true;
                return;
            }
            if (order.email === null || order.email === '' || typeof order.email === 'undefined') {
                bookInfoCtrl.error1 = null;
                bookInfoCtrl.error2 = "Valid Email required!";
                bookInfoCtrl.submitted2 = true;
                return;
            }
            if (order.quantity === null || order.quantity === '' || typeof order.quantity === 'undefined') {
                bookInfoCtrl.error1 = null;
                bookInfoCtrl.error2 = null;
                bookInfoCtrl.error3 = "Quantity required to place any order!";
                bookInfoCtrl.submitted3 = true;
                return;
            }
             bookService
                     .findBookById(bookId)
                     .then(function (book) {
                         buyerCreate(book);
                     });

        function buyerCreate(book) {
            var newOrder = {
                email: order.email,
                venmo: order.venmo,
                message: order.message,
                name: book.name,
                seller: book._user.username,
                quantity: order.quantity,
                photo: book.photo,
                bookId:book._id
            };
            orderService
                .createOrder(newOrder, userId)
                .then(function (buyerOder) {
                    var newOrder = {
                        email: order.email,
                        venmo: order.venmo,
                        message: order.message,
                        name: book.name,
                        buyer: currentUser.username,
                        quantity: order.quantity,
                        photo: book.photo,
                        bookId: book._id,
                        borderId: buyerOder._id
                    };
                    orderService
                        .createOrder(newOrder,book._user._id)
                        .then(function (sellerOrder) {
                            bookInfoCtrl.message = "Your buying request sent successfully!!";
                            // $location.url('/buyer/books/'+bookId);
                            orderService
                                .updateBuyerOrder(buyerOder._id,sellerOrder._id)
                                .then(function (status) {
                                    $location.url('/buyer/books/'+bookId);
                                });
                        });

                });
        }}


        
        
        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                });
        }

        function searchBook(bookId) {
            bookService
                .findBookById(bookId)
                .then(function (book) {
                    bookInfoCtrl.book = book;
                    var isbn = bookInfoCtrl.book.isbn;
                    bookInfoCtrl.googleSearch(isbn);
                });
        }
        function googleSearch(isbn) {
            searchService
                .searchBook(isbn)
                .then(function (response) {
                    bookInfoCtrl.item = response.data.items[0].volumeInfo;});
        }



    }
})();