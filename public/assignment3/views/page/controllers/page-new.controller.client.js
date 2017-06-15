/**
 * Created by manika on 6/14/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('pageNewController',pageNewController);
    function pageNewController($location, pageService, $routeParams, $route) {
        var model=this;
        model.userId=$routeParams.userId;
        model.websiteId=$routeParams.websiteId;
        model.createPage=createPage;
        model.reloadPage=reloadPage;
        
        function init() {
            model.pages=pageService.findPageByWebsiteId(model.websiteId);
        }
        init();

        function reloadPage() {
            $route.reload();
        }
        
        function createPage() {
            if (( typeof model.newPage === 'undefined' ) || model.newPage.name === null || ( typeof model.newPage.name === 'undefined' ) || model.newPage.name === '') {
                model.error = " Page name is mandatory ";
                return;
            }
            pageService.createPage(model.websiteId, model.newPage);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }
    }
})();