
(function () {
    angular
        .module('BookAppMaker')
        .controller('buyerFollowingController', buyerFollowingController);

    function buyerFollowingController(bookService, currentUser,$location, userService, orderService) {
        var model = this;

        model.userId = currentUser._id;//$routeParams['userId'];
        model.currentUser = currentUser;
        model.logout = logout;
        model.unfollowSeller = unfollowSeller;
        model.init = init;

        function init() {

            userService
                         .findUserById(model.userId)
                         .then(renderFollowing);

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



        function renderFollowing(user) {
            model.following = user.follows;

            for(var f = 0; f<model.following.length; f++){
                model.sellers = [];
                userService
                    .findUserById(model.following[f])
                    .then(function (seller) {

                        model.sellers.push(seller);

                    });
            }
        }

    }

})();