module.exports=function(app){
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
    ];
    app.get('/api/assignment4/website/:websiteId/page', findPageByWebsiteId)
    app.post('/api/assignment4/website/:websiteId/page', createPage)
    app.get('/api/assignment4/page/:pageId', findPageById)
    app.put('/api/assignment4/page/:pageId', updatePage)
    app.delete('/api/assignment4/page/:pageId', deletePage)

    function findPageByWebsiteId(req,res) {
        var websiteId=req.params.websiteId;

        var results = [];
        for (var page in pages) {
            if (pages[page].websiteId == websiteId) {
                results.push(pages[page]);
            }
        }
        res.send(results);

    }

    function createPage(req,res) {
        var websiteId=req.params.websiteId;
        var page=req.body;
        page._id=new Date().getTime()+"";
        page.websiteId=websiteId;
        pages.push(page);
        res.sendStatus(200);
    }

    function findPageById(req,res) {
        var pageId= req.params.pageId;
        var page = pages.find(function (page) {
            return page._id === pageId;
        });

        if (typeof page === 'undefined') {
            res.sendStatus(404);
        }
        res.json(page);

    }

    function findPage(pageId) {
        var page = pages.find(function (page) {
            return page._id === pageId;
        });

        if (typeof page === 'undefined') {
            return null;
        }
        return page;
    }
    function updatePage(req, res) {
        var pageId=req.params.pageId;
        var page=req.body;
        var pageToBeUpdated = findPage(pageId);
        if(pageToBeUpdated) {
            var index = pages.indexOf(pageToBeUpdated);
            pages[index] = page;
            res.sendStatus(200);
        }
        else
            res.sendStatus(404);
    }

    function deletePage(req, res) {
        var pageId=req.params.pageId;
        var pageToBeDeleted = findPage(pageId);
        if(pageToBeDeleted) {
            var index = pages.indexOf(pageToBeDeleted);
            pages.splice(index, 1);
            res.sendStatus(200);
        }
        else
            res.sendStatus(404);
    }
}
