(function () {
    angular
        .module('BookAppMaker')
        .controller('adminOrdersController', adminOrdersController);

    function adminOrdersController(userService, currentUser,$location, bookService, orderService) {
        var model = this;
        model.deleteOrder = deleteOrder;
        model.findAllUsers = findAllUsers;
        model.addOrder = addOrder;
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




        function addOrder(buyerId, bookId, Status) {
            switch (Status) {

                case "Pending":
                    var request = true;
                    var reject = false;
                    break;
                case "Shipping":
                     request = false;
                     reject = false;
                    break;
                case "Rejected":
                    request = true;
                    reject = true;

                    break;
                default:
                    break;
            }
            bookService
                .findBookById(bookId)
                .then(function (book) {
                    buyerCreate(book, request, reject);
                });
            function buyerCreate(book ,request, reject) {
                var newOrder = {
                    name: book.name,
                    seller: book._user.username,
                    photo: book.photo,
                    bookId:book._id,
                    request: request,
                    reject: reject
                };
                if(request===true&&reject===true){
                    orderService
                        .createOrder(newOrder, buyerId)
                        .then(findAllUsers);
                } else {
                orderService
                    .createOrder(newOrder, buyerId)
                    .then(function (buyerOder) {
                        var newOrder = {
                            name: book.name,
                            buyer: currentUser.username,
                            photo: book.photo,
                            bookId: book._id,
                            borderId: buyerOder._id,
                            request: request,
                            reject: reject
                        };
                        orderService
                            .createOrder(newOrder,book._user._id)
                            .then(function (sellerOrder) {
                                orderService
                                    .updateBuyerOrder(buyerOder._id,sellerOrder._id)
                                    .then(findAllUsers);
                            });

                    });
            }
            }
        }

        function deleteOrder(order) {
            if(order.request===true&&order.reject===true){
                orderService
                    .deleteOrder(order._id)
                    .then(findAllUsers);
            } else{
                orderService
                    .deleteOrder(order._id)
                    .then(function () {
                        orderService
                            .deleteOrder(order.sorderId)
                            .then(findAllUsers);
                    });
            }
        }

        function init() {
            findAllUsers();

        }

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    var buyers = [];
                    var sellers = [];
                    var books = [];
                    for(var u =0; u<users.length;u++){
                        if(users[u].roles[0] === 'BUYER'){
                            userService
                                .findBuyerForOrderAdmin(users[u]._id)
                                .then(function (buyer) {
                                    buyers.push(buyer);
                                });
                        } else if(users[u].roles[0] === 'SELLER'){

                            userService
                                .findSellerForOrderAdmin(users[u]._id)
                                .then(function (seller) {
                                    sellers.push(seller);
                                });

                        }
                    }
                    model.buyers = buyers;
                    model.sellers = sellers;
                   bookService
                       .findAllBooks()
                       .then(function (books) {
                           model.books = books;
                       });


                });
        }
    }
})();