/**
 * Created by manika on 6/14/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("pageService", pageService);

    function pageService() {
        this.createPage = createPage;
        this.findPageById = findPageById;
        this.findPageByWebsiteId = findPageByWebsiteId;
        this.updatePage = updatePage;
        this.deletePage = deletePage;

        var pages = [
                {"_id": "321", "name": "Games", "websiteId": "456", "title": "Details about Game"},
                {"_id": "231", "name": "Electronics", "websiteId": "456", "title": "Laptops, Tablets"},
                {"_id": "432", "name": "HeadPhones", "websiteId": "890", "title": "Good brand of headphones available"},
                {"_id": "342", "name": "Video Games", "websiteId": "890", "title": "All video games that run on X-Box and PS"},
                {"_id": "123", "name": "Monitors", "websiteId": "678", "title": "All types of monitors available"},
                {"_id": "132", "name": "Accessories", "websiteId": "678", "title": "All types of accessories needed for Home"},
                {"_id": "543", "name": "Dresses-Women", "websiteId": "567", "title": "Dresses, Shirts, Jeans, Skirts"},
                {"_id": "345", "name": "Luggage", "websiteId": "567", "title": "Suitcases, Women-bags" },
                {"_id": "879", "name": "Drives & Storage", "websiteId": "789", "title": "Pendrives,harddisks"},
                {"_id": "978", "name": "Software", "websiteId": "789", "title": "Valid Softwares like Matlab, Photoshop"},
                {"_id": "567", "name": "Dresses-Men", "websiteId": "345", "title": "Men - Shirts, T-Shirts, Pants"},
                {"_id": "675", "name": "Kindle Books","websiteId": "345", "title": "Books that can be read on Kindle" },
                {"_id": "765", "name": "Furniture", "websiteId": "123", "title":"Chairs, Tables, Beds"},
                {"_id": "657", "name": "Kitchen", "websiteId": "123", "title": "All kitchen appliances"},
                {"_id": "145", "name": "Appliances", "websiteId": "234", "title": "All types of appliances"},
                {"_id": "451", "name": "Books", "websiteId": "234", "title": "Books available in all languages"}
            ]

        ;

        function createPage(websiteId,page){
            page._id=new Date().getTime()+"";
            page.websiteId=websiteId;
            pages.push(page);
            return;
        }

        function findPageById(pageId) {
            var page = pages.find(function (page) {
                return page._id === pageId;
            });

            if (typeof page === 'undefined') {
                return null;
            }
            return page;
        }

        function findPageByWebsiteId(websiteId) {
            var results = [];
            for (var page in pages) {
                if (pages[page].websiteId == websiteId) {
                    results.push(pages[page]);
                }
            }
            return results;
        }

        function updatePage(pageId, page) {
            var pageToBeUpdated = findPageById(pageId);
            var index = pages.indexOf(pageToBeUpdated);
            pages[index] = page;
            return;
        }

        function deletePage(pageId) {
            var pageToBeDeleted = findPageById(pageId);
            var index = pages.indexOf(pageToBeDeleted);
            pages.splice(index, 1);
            return;
        }

    }
})();