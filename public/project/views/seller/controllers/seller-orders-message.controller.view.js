
(function () {
    angular
        .module('BookAppMaker')
        .controller('sellerOrdersMessageController', sellerOrdersMessageController);
    
    function sellerOrdersMessageController(bookService, currentUser,$location, userService, orderService,$routeParams) {
        var model = this;

        model.userId = currentUser._id;//$routeParams['userId'];
        model.currentUser = currentUser;
        model.logout = logout;
        model.orderId = $routeParams['orderId'];

        function init() {
            orderService
                         .findOrderById(model.orderId)
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
            model.message = order.message;
        }

    }

})();