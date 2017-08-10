
(function () {
    angular
        .module('MyBookApp')
        .controller('buyerOrdersController', buyerOrdersController);
    
    function buyerOrdersController(bookService, currentUser,$location, userService, orderService) {
        var buyerOrderCtrl = this;

        buyerOrderCtrl.userId = currentUser._id;//$routeParams['userId'];
        buyerOrderCtrl.currentUser = currentUser;
        buyerOrderCtrl.logout = logout;
        buyerOrderCtrl.deleteOrder = deleteOrder;
        buyerOrderCtrl.deleteBothOrder = deleteBothOrder;

        function init() {
            orderService
                         .findAllOrdersForUser(buyerOrderCtrl.userId)
                         .then(renderOrders);

        }
        init();





        
        function deleteBothOrder(orderId, sorderId) {
            orderService
                .deleteOrder(orderId)
                .then(function () {
                    orderService
                        .deleteOrder(sorderId)
                        .then(function () {
                            orderService
                                .findAllOrdersForUser(buyerOrderCtrl.userId)
                                .then(renderOrders);
                        });
                });
        }



        function deleteOrder(orderId) {
            orderService
                .deleteOrder(orderId)
                .then(function () {
                    orderService
                        .findAllOrdersForUser(buyerOrderCtrl.userId)
                        .then(renderOrders);
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
            buyerOrderCtrl.orders = orders;
        }

    }

})();