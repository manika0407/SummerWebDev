var app = require('../../express');

var orderModel = require('../models/orders/order.model.server');


app.get("/api/project/user/:userId/order", findAllOrdersForUser);

app.post("/api/project/user/:userId/order", createOrder);

app.get("/api/project/order/:orderId", findOrderById);

app.put("/api/project/order/:orderId", updateOrder);

app.delete("/api/project/order/:orderId", deleteOrder);

app.get("/api/project/orders", findAllOrders);

app.put("/api/project/accept/order/:orderId", acceptOrder);

app.put("/api/project/buyer/order/:orderId", updateBuyerOrder);

app.put("/api/project/reject/order/:orderId", updateBOrder);






function updateBOrder(req, res) {
    var orderId = req.params.orderId;
    orderModel
        .updateBOrder(orderId)
        .then(function (status) {
            res.send(status);
        });
}




function updateBuyerOrder(req, res) {
    var buyerOrderId = req.params.orderId;
    var sorderId = req.body.sorderId;

    orderModel
        .updateBuyerOrder(buyerOrderId,sorderId)
        .then(function (status) {
            res.json(status);
        });

}



function acceptOrder(req, res) {
    var orderId = req.params.orderId;
    var borderId = req.body.borderId;
    orderModel
        .acceptOrder(orderId, borderId)
        .then(function (status) {
            res.json(status);
        });
}



function findAllOrders(req, res) {
    orderModel
        .findAllOrders()
        .then(function (orders) {
            res.json(orders);
        });
}

function findOrderById(req, res) {

    var orderId = req.params.orderId;
    orderModel
        .findOrderById(orderId)
        .then(function (order) {
            res.json(order);
        });
}

function createOrder(req, res) {
    var order = req.body;
    var userId = req.params.userId;
    orderModel
        .createOrderForUser(userId, order)
        .then(function (order) {
            res.json(order);
        });
}

function deleteOrder(req, res) {
    var orderId = req.params.orderId;
    orderModel
        .deleteOrderFromUser(orderId)
        .then(function (status) {
            res.json(status);
        });
}

function updateOrder(req, res) {
    var orderId = req.params.orderId;
    var order = req.body;
    orderModel
        .updateOrder(orderId, order)
        .then(function (status) {
            res.send(status);
        });
}





function findAllOrdersForUser(req, res) {
    var results = [];
    var userId = req.params.userId;
        orderModel
            .findAllOrdersForUser(userId)
            .then(function (orders) {
                res.json(orders);
            });
}



