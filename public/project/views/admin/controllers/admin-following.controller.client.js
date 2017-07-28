
(function () {
    angular
        .module('BookAppMaker')
        .controller('adminFollowingController', adminFollowingController);

    function adminFollowingController(userService, currentUser,$location, bookService) {
        var model = this;
        model.followSeller = followSeller;
        model.unfollowSeller = unfollowSeller;
        model.findAllUsers = findAllUsers;
        model.currentUser = currentUser;
        model.logout = logout;

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/')
                });
        }


        init();



        function followSeller(userId, sellerId) {
            userService
                .followSeller(userId, sellerId)
                .then(findAllUsers);
        }

        function unfollowSeller(userId, sellerId) {
            userService
                .unfollowSeller(userId, sellerId)
                .then(findAllUsers);
        }





        function init() {
            findAllUsers();
        }

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    var buyers = [];
                    var sellers = [];
                    for(var u =0; u<users.length;u++){
                        if(users[u].roles[0] === 'BUYER'){
                            userService
                                .findBuyer(users[u]._id)
                                .then(function (buyer) {
                                    buyers.push(buyer);
                                });
                        } else if(users[u].roles[0] === 'SELLER'){
                            sellers.push(users[u]);
                        }
                    }
                    model.buyers = buyers;
                    model.sellers = sellers;

                });
        }
    }
})();