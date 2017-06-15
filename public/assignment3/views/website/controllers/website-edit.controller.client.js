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
                model.websites =websiteService.findWebsitesByUser(model.userId);
                model.website=websiteService.findWebsiteById(model.websiteId);
            }
            init();

            //implementation
            function createWebsite(website) {
                website.developerId=model.userId;
                websiteService.createWebsite(website);
                $location.url('/user/'+model.userId+'/website')
            }

            function updateWebsite() {
                if (( typeof model.website === 'undefined' ) || model.website.name === null ||
                    ( typeof model.website.name === 'undefined' ) || model.website.name === '') {
                    model.error = " Website name is mandatory ";
                    // $anchorScroll('top');
                    return;
                }
                websiteService.updateWebsite(model.websiteId, model.website);
                $location.url('/user/' + model.userId + "/website");
            }

            function deleteWebsite(websiteId) {
                websiteService.deleteWebsite(websiteId);
                $location.url('/user/'+model.userId+'/website');
            }

                }
})();