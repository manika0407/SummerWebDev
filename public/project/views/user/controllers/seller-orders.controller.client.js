
(function () {
    angular
        .module('MyBookApp')
        .controller('sellerOrdersController', sellerOrdersController);
    
    function sellerOrdersController(bookService, currentUser,$location, userService, orderService) {
        var sellerOrderCtrl = this;

        sellerOrderCtrl.userId = currentUser._id;
        sellerOrderCtrl.currentUser = currentUser;
        sellerOrderCtrl.logout = logout;
        sellerOrderCtrl.acceptOrder = acceptOrder;
        sellerOrderCtrl.deleteOrder = deleteOrder;


        function init() {
            orderService
                         .findAllOrdersForUser(sellerOrderCtrl.userId)
                         .then(renderOrders);

        }
        init();





        function deleteOrder(orderId, borderId) {
            orderService
                .deleteOrder(orderId)
                .then(function () {
                    orderService
                        .updateBOrder(borderId)
                        .then(function (status) {
                            orderService
                                .findAllOrdersForUser(sellerOrderCtrl.userId)
                                .then(renderOrders);

                        })
                });
        }
        
        
        
        
        function acceptOrder(orderId, quantity, bookId, borderId) {
           bookService
               .findBookById(bookId)
               .then(function (book) {
                   if(book.inventory < quantity){
                       sellerOrderCtrl.message = "The requested quantity by Buyer is more than What you have in stock!! Please update your inventory."
                   } else {
                       var number = book.inventory - quantity;
                       bookService
                           .updateInventory(bookId, number)
                           .then(function () {
                               orderService
                                   .acceptOrder(orderId, borderId)
                                   .then(function () {
                                       orderService
                                           .findAllOrdersForUser(sellerOrderCtrl.userId)
                                           .then(renderOrders);

                                   });

                           });
                   }

                   });
        }



        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                });
        }



        function renderOrders(orders) {
            sellerOrderCtrl.orders = orders;
        }

    }

})();