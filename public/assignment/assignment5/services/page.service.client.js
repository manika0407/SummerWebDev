/**
 * Created by manika on 6/14/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("pageService", pageService);

    function pageService($http) {
        this.createPage = createPage;
        this.findPageById = findPageById;
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        function createPage(websiteId,page){
            var url="/api/website/"+websiteId+"/page";
            return $http.post(url,page)
                .then(function (response) {
                    return response.data;
                })

        }

        function findPageById(pageId) {
            var url="/api/page/"+pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })

        }

        function findPageByWebsiteId(websiteId) {
            var url="/api/website/"+websiteId+"/page";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updatePage(pageId, page) {
            var url="/api/page/"+pageId;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePage(pageId) {
            var url="/api/page/"+pageId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })

            // var pageToBeDeleted = findPageById(pageId);
            // var index = pages.indexOf(pageToBeDeleted);
            // pages.splice(index, 1);
            // return;
        }

    }
})();