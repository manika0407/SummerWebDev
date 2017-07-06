/**
 * Created by manika on 6/12/17.
 */
(function () {
        angular
            .module('WebAppMaker')
            .controller('websiteEditController',websiteEditController);

        function websiteEditController($routeParams,
                                      websiteService, $location){

            var model=this;
            model.userId=$routeParams['userId'];
            model.websiteId=$routeParams.websiteId;


            //event handlers
            model.createWebsite=createWebsite;
            model.updateWebsite=updateWebsite;
            model.deleteWebsite=deleteWebsite;



            function init() {
                websiteService
                    .findWebsitesByUser(model.userId)
                    .then(function (websites) {
                        model.websites=websites;
                    })
               websiteService
                   .findWebsiteById(model.userId,model.websiteId)
                   .then(function (website) {
                       model.website=website;
                   })

            }
            init();

            //implementation
            function createWebsite(website) {
                website.developerId=model.userId;
                websiteService
                    .createWebsite(website)
                    .then(function (website) {

                        $location.url('/user/'+model.userId+'/website')
                })

            }

            function updateWebsite(website) {
                if (( typeof model.website === 'undefined' ) || model.website.name === null ||
                    ( typeof model.website.name === 'undefined' ) || model.website.name === '') {
                    model.error = "Website name is mandatory. Please try again with valid website name" ;
                    // $anchorScroll('top');
                    return;
                }
                websiteService
                    .updateWebsite(model.userId, model.websiteId, website)
                    .then(function (website) {
                        $location.url('/user/' + model.userId + "/website");
                    })

            }

            function deleteWebsite(website) {
                websiteService
                    .deleteWebsite(model.userId, model.websiteId)
                    .then(function () {
                        $location.url('/user/'+model.userId+'/website');
                    })

            }

                }
})();