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
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(function (pages) {
                    model.pages=pages;
                })
        }
        init();

        function reloadPage() {
            $route.reload();
        }
        
        function createPage() {
            if (( typeof model.newPage === 'undefined' ) || model.newPage.name === null || ( typeof model.newPage.name === 'undefined' ) || model.newPage.name === '') {
                model.error = " Page Name is Mandatory. Please Try again with valid Page name";
                return;
            }
            pageService
                .createPage(model.websiteId, model.newPage)
                .then(function (newPage) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                })

        }
    }
})();