(function () {
    angular
        .module('BookAppMaker')
        .controller('sellerBooksListController', sellerBooksListController);
    
    function sellerBooksListController(bookService, currentUser,$location, userService,$routeParams) {
        var model = this;
        model.sellerId = $routeParams['sellerId'];
        model.userId = currentUser._id;//$routeParams['userId'];
        model.currentUser = currentUser;
        model.logout = logout;
        model.followSeller = followSeller;
        model.unfollowSeller =unfollowSeller;

        function init() {
            bookService
                         .findAllBooksForUser(model.sellerId)
                         .then(renderBooks);
            userService
                .findUserById(model.sellerId)
                .then(function (seller) {
                    model.seller = seller;
                    userService
                        .findFollowSellerById(model.userId,model.seller._id)
                        .then(function (user) {
                            if(user){
                                model.follow = true;

                            } else{
                                model.follow = false;

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
            model.books = books;
        }

    }

})();