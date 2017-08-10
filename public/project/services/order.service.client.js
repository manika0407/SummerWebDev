(function () {
    angular
        .module('MyBookApp')
        .service('orderService', orderService);

    function orderService($http) {
    var projectURL='/api/project';
    var userURL='/api/project/user';
    var orderURL='/api/project/order';

        var api= {
        findAllOrdersForUser : findAllOrdersForUser,
        findOrderById : findOrderById,
        deleteOrder : deleteOrder,
        createOrder : createOrder,
        updateOrder : updateOrder,
        findAllOrders : findAllOrders,
        acceptOrder : acceptOrder,
        updateBuyerOrder : updateBuyerOrder,
        updateBOrder : updateBOrder,
    }

    return api;


        function updateBOrder(borderId) {
            var url = projectURL+"/reject/order/" + borderId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function updateBuyerOrder(buyerOrderId, sellerOrderId) {
            var url = projectURL+"/buyer/order/" + buyerOrderId;
            var sellerOrder = {sorderId: sellerOrderId};
            return $http.put(url, sellerOrder)
                .then(function (response) {
                    return response.data;
                });
        }


        function acceptOrder(orderId, borderId) {
            var url = projectURL+"/accept/order/" + orderId;
            var borderId = {borderId: borderId};
            return $http.put(url, borderId)
                .then(function (response) {
                    return response.data;
                });
        }


        function findAllOrders() {
            var url = projectURL+"/orders";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function updateOrder (orderId, order) {
            var url = orderURL+"/" + orderId;
            return $http.put(url, order)
                        .then(function (response) {
                            return response.data;
                        });
        }

        function createOrder(order, userId){
            var url = userURL+"/"+userId+"/order";
            return $http
                        .post(url, order)
                        .then(function (response) {
                            return response.data;
                        });
        }



        function deleteOrder(orderId) {
            var url = orderURL+"/" + orderId;
            return $http.delete(url)
                        .then(function (response) {
                            return response.data;
                        });
        }



        function findOrderById(orderId) {
            var url = orderURL+"/" + orderId;
            return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        });
        }

        function findAllOrdersForUser(userId) {
            var url = userURL+"/"+userId+"/order";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();