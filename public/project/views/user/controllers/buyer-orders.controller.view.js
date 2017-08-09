
(function () {
    angular
        .module('MyBookApp')
        .controller('buyerOrdersController', buyerOrdersController);
    
    function buyerOrdersController(bookService, currentUser,$location, userService, orderService) {
        var model = this;

        model.userId = currentUser._id;//$routeParams['userId'];
        model.currentUser = currentUser;
        model.logout = logout;
        model.deleteOrder = deleteOrder;
        model.deleteBothOrder = deleteBothOrder;

        function init() {
            orderService
                         .findAllOrdersForUser(model.userId)
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
                                .findAllOrdersForUser(model.userId)
                                .then(renderOrders);
                        });
                });
        }



        function deleteOrder(orderId) {
            orderService
                .deleteOrder(orderId)
                .then(function () {
                    orderService
                        .findAllOrdersForUser(model.userId)
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
            model.orders = orders;
        }

    }

})();