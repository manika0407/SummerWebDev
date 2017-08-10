(function () {
    angular
        .module('MyBookApp')
        .controller('sellerBooksListController', sellerBooksListController);
    
    function sellerBooksListController(bookService, currentUser,$location, userService,$routeParams) {
        var buyerSellerBooksCtrl = this;
        buyerSellerBooksCtrl.sellerId = $routeParams['sellerId'];
        buyerSellerBooksCtrl.userId = currentUser._id;//$routeParams['userId'];
        buyerSellerBooksCtrl.currentUser = currentUser;
        buyerSellerBooksCtrl.logout = logout;
        buyerSellerBooksCtrl.followSeller = followSeller;
        buyerSellerBooksCtrl.unfollowSeller =unfollowSeller;

        function init() {
            bookService
                         .findAllBooksForUser(buyerSellerBooksCtrl.sellerId)
                         .then(renderBooks);
            userService
                .findUserById(buyerSellerBooksCtrl.sellerId)
                .then(function (seller) {
                    buyerSellerBooksCtrl.seller = seller;
                    userService
                        .findFollowSellerById(buyerSellerBooksCtrl.userId,buyerSellerBooksCtrl.seller._id)
                        .then(function (user) {
                            if(user){
                                buyerSellerBooksCtrl.follow = true;

                            } else{
                                buyerSellerBooksCtrl.follow = false;

                            }
                        });

                });
        }
        init();






        function unfollowSeller(userId, sellerId) {

            userService
                .unfollowSeller(userId, sellerId)
                .then(function () {
                    init();
                });
        }





        function followSeller(userId, sellerId) {

            userService
                .followSeller(userId, sellerId)
                .then(function () {
                    init();
                });
        }



        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                });
        }



        function renderBooks(books) {
            buyerSellerBooksCtrl.books = books;
        }

    }

})();