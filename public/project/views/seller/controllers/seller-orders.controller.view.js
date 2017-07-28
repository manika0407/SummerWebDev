
(function () {
    angular
        .module('BookAppMaker')
        .controller('sellerOrdersController', sellerOrdersController);
    
    function sellerOrdersController(bookService, currentUser,$location, userService, orderService) {
        var model = this;

        model.userId = currentUser._id;//$routeParams['userId'];
        model.currentUser = currentUser;
        model.logout = logout;
        model.acceptOrder = acceptOrder;
        model.deleteOrder = deleteOrder;


        function init() {
            orderService
                         .findAllOrdersForUser(model.userId)
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
                                .findAllOrdersForUser(model.userId)
                                .then(renderOrders);

                        })
                });
        }
        
        
        
        
        function acceptOrder(orderId, quantity, bookId, borderId) {
           bookService
               .findBookById(bookId)
               .then(function (book) {
                   if(book.inventory < quantity){
                       model.message = "Sorry, upload more books on your inventory!!"
                   } else {
                       var number = book.inventory - quantity;
                       bookService
                           .updateInventory(bookId, number)
                           .then(function () {
                               orderService
                                   .acceptOrder(orderId, borderId)
                                   .then(function () {
                                       orderService
                                           .findAllOrdersForUser(model.userId)
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
            model.orders = orders;
        }

    }

})();