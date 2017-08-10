
(function () {
    angular
        .module('MyBookApp')
        .controller('buyerFollowingController', buyerFollowingController);

    function buyerFollowingController(bookService, currentUser,$location, userService, orderService) {
        var buyerFollowingCtrl = this;

        buyerFollowingCtrl.userId = currentUser._id;//$routeParams['userId'];
        buyerFollowingCtrl.currentUser = currentUser;
        buyerFollowingCtrl.logout = logout;
        buyerFollowingCtrl.unfollowSeller = unfollowSeller;
        buyerFollowingCtrl.init = init;

        function init() {

            userService
                         .findUserById(buyerFollowingCtrl.userId)
                         .then(renderFollowers);

        }
        init();






        function unfollowSeller(userId, sellerId) {

            userService
                .unfollowSeller(userId, sellerId)
                .then(function () {
                    $location.url('/profile/buyer')
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                });
        }


        function renderFollowers(user) {
            buyerFollowingCtrl.following = user.follows;

            for(var i = 0; i<buyerFollowingCtrl.following.length; i++){
                buyerFollowingCtrl.sellers = [];
                userService
                    .findUserById(buyerFollowingCtrl.following[i])
                    .then(function (seller) {

                        buyerFollowingCtrl.sellers.push(seller);

                    });
            }
        }

    }

})();