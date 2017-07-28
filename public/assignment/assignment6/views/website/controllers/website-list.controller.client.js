/**
 * Created by manika on 6/12/17.
 */
(function () {
        angular
            .module('WebAppMaker')
            .controller('websiteListController',websiteListController);

        function websiteListController($routeParams,websiteService, currentUser){

            var model=this;
            model.userId=currentUser._id;



            function init() {
                websiteService
                    .findWebsitesByUser(model.userId)
                    .then(function (websites) {
                        model.websites=websites;
                    });
            }
            init();



                }
})();