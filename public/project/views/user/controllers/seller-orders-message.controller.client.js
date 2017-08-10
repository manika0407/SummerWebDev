
(function () {
    angular
        .module('MyBookApp')
        .controller('sellerOrdersMessageController', sellerOrdersMessageController);
    
    function sellerOrdersMessageController(bookService, currentUser,$location, userService, orderService,$routeParams) {
        var sellerOrderMessageCtrl = this;

        sellerOrderMessageCtrl.userId = currentUser._id;//$routeParams['userId'];
        sellerOrderMessageCtrl.currentUser = currentUser;
        sellerOrderMessageCtrl.logout = logout;
        sellerOrderMessageCtrl.orderId = $routeParams['orderId'];

        function init() {
            orderService
                         .findOrderById(sellerOrderMessageCtrl.orderId)
                         .then(renderMessage);

        }
        init();



        




        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                });
        }



        function renderMessage(order) {
            sellerOrderMessageCtrl.message = order.message;
            sellerOrderMessageCtrl.buyer=order.buyer;
        }

    }

})();