/**
 * Created by manika on 6/14/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('pageEditController', pageEditController);
    
    function pageEditController($location,pageService,$routeParams,$route) {
        var model=this;
        model.userId=$routeParams.userId;
        model.websiteId=$routeParams.websiteId;
        model.pageId=$routeParams.pageId;
        model.updatePage=updatePage;
        model.deletePage=deletePage;
        model.reloadPage=reloadPage;
        
        function init() {
            //model.pages=
              pageService
                  .findPageByWebsiteId(model.websiteId)
                  .then(function (pages) {
                      model.pages=pages;
                  })
            pageService
                .findPageById(model.pageId)
                .then(function (page) {
                    model.page=page;
                })
            
            
            //model.page=angular.copy(pageService.findPageById(model.pageId));
        }
        init();
        
        function reloadPage() {
            $route.reload();
        }
        function updatePage() {
            if (( typeof model.page === 'undefined' ) || model.page.name === null || ( typeof model.page.name === 'undefined' ) || model.page.name === '') {
                model.error = " Page Name is Mandatory. Please Try again with valid Page name ";
                return;
            }
            pageService
                .updatePage(model.pageId, model.page)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                })

        }
        function deletePage() {
            pageService
                .deletePage(model.pageId)
                .then(function () {
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                })

        }
    }
})();