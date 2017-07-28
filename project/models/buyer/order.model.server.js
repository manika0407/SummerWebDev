var mongoose = require('mongoose');
var orderSchema = require('./order.schema.server');
var orderModel = mongoose.model('OrderModel', orderSchema);
var userModel = require('../user/user.model.server');

//api
orderModel.findAllOrders = findAllOrders;
orderModel.createOrderForUser = createOrderForUser;
orderModel.findAllOrdersForUser = findAllOrdersForUser;
orderModel.deleteOrderFromUser = deleteOrderFromUser;
orderModel.findOrderById = findOrderById;
orderModel.updateOrder = updateOrder;
orderModel.acceptOrder = acceptOrder;
orderModel.updateBuyerOrder = updateBuyerOrder;
orderModel.updateBOrder = updateBOrder;

module.exports = orderModel;




function updateBOrder(orderId) {
    return orderModel.update({_id: orderId}, {$set:{reject:true}});

}


function updateBuyerOrder(buyerOrderId,sorderId) {
    return orderModel.update({_id: buyerOrderId}, {$set: {sorderId:sorderId}});
}



function acceptOrder(orderId, borderId) {
    return orderModel.update({_id: orderId}, {$set: {request: false}})
        .then(function () {
            return orderModel
                .update({_id: borderId}, {$set:{request:false}});
        });
}


function updateOrder(orderId, neworder) {
    return orderModel.update({_id: orderId}, {$set: neworder});
}

function findOrderById(orderId) {
     return orderModel.findById(orderId)
                     .populate('_user')
                     .exec();

}

function deleteOrderFromUser(orderId) {
    return orderModel
        .remove({_id: orderId})
        .then(function (status) {
            return userModel
                   .deleteOrder(orderId);
        });
}


function findAllOrdersForUser(userId) {
    return orderModel
                    .find({_user: userId})
                    .populate('_user')
                    .exec();
}




function createOrderForUser(userId, order) {
    order._user = userId;
    return orderModel.create(order)
        .then(function (order) {
            return userModel
                .addOrder(userId, order._id)
                .then(function () {
                    return order;
                });
        });
}




function findAllOrders() {
 return orderModel.find()
        .populate('_user')
        .exec();
}

