var app = require('../../../express');
var pageModel = require('../models/page/page.model.server');

    app.get('/api/website/:websiteId/page', findPageByWebsiteId)
    app.post('/api/website/:websiteId/page', createPage)
    app.get('/api/page/:pageId', findPageById)
    app.put('/api/page/:pageId', updatePage)
    app.delete('/api/page/:pageId', deletePage)

    function findPageByWebsiteId(req,res) {
        var websiteId=req.params.websiteId;

        var results = [];
       pageModel
           .findAllPagesForWebsite(websiteId)
           .then(function (pages) {
               res.json(pages);
           });

    }

    function createPage(req,res) {
        var websiteId=req.params.websiteId;
        var page=req.body;
        pageModel
            .createPage(websiteId, page)
            .then(function (page) {
               res.json(page);
            })
    }

    function findPageById(req,res) {
        var pageId= req.params.pageId;
       pageModel
           .findPageById(pageId)
           .then(function (page) {
               return res.json(page);
           })

    }

    function updatePage(req, res) {
        var pageId=req.params.pageId;
        var page=req.body;

        pageModel
            .updatePage(pageId, page)
            .then(function (status) {
                res.json(status);
            });
    }

    function deletePage(req, res) {
        var pageId=req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(function (status) {
                res.json(status);
            });

    }

