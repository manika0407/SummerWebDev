/**
 * Created by manika on 6/12/17.
 */
(function () {
        angular
            .module('WebAppMaker')
            .controller('websiteNewController',websiteNewController);

        function websiteNewController($routeParams,
                                      websiteService, $location){

            var model=this;
            model.userId=$routeParams['userId'];
            //event handlers
            model.createWebsite=createWebsite;



            function init() {
                model.websites =websiteService.findWebsitesByUser(model.userId)
            }
            init();

            //implementation
            function createWebsite() {
                if (( typeof model.website === 'undefined' ) || model.website.name === null || ( typeof model.website.name === 'undefined' ) || model.website.name === '') {
                    model.error = " Website name is mandatory. Please try again with valid website name ";
                    return;
                }
                websiteService.createWebsite(model.userId,model.website);
                $location.url('/user/'+model.userId+'/website')
            }


                }
})();