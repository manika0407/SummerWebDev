
(function () {
    angular
        .module('MyBookApp')
        .controller('bookInfoController', bookInfoController);

    function bookInfoController ($routeParams, bookService, $location, searchService,currentUser, userService,orderService) {

        var model = this;

        model.bookId = $routeParams['bookId'];
        model.searchBook = searchBook;
        model.googleBook = googleBook;
        model.currentUser = currentUser;
        model.logout = logout;
        model.userId = currentUser._id;
        model.createOrder = createOrder;


        function init() {
            searchBook(model.bookId);
        }
        init();








        function createOrder(order, userId, bookId) {
            if (order.venmo === null || order.venmo === '' || typeof order.venmo === 'undefined') {
                model.error1 = "Venmo is required in order to avail transaction!";
                model.error2 = null;
                model.submitted1 = true;
                return;
            }
            if (order.email === null || order.email === '' || typeof order.email === 'undefined') {
                model.error1 = null;
                model.error2 = "Valid Email required!";
                model.submitted2 = true;
                return;
            }
            if (order.quantity === null || order.quantity === '' || typeof order.quantity === 'undefined') {
                model.error1 = null;
                model.error2 = null;
                model.error3 = "Quantity required to place any order!";
                model.submitted3 = true;
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
                            model.message = "Your buying request sent successfully!!";
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
                    model.book = book;
                    var isbn = model.book.isbn;
                    model.googleBook(isbn);
                });
        }
        function googleBook(isbn) {
            searchService
                .searchBook(isbn)
                .then(function (response) {
                    model.item = response.data.items[0].volumeInfo;});
        }



    }
})();