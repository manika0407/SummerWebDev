var app = require('../../express');
var websiteModel = require('../models/website/website.model.server');

    app.get('/api/user/:userId/website', findWebsitesByUser)
    app.get('/api/user/:userId/website/:websiteId', findWebsiteById)
    app.post('/api/user/:userId/website', createWebsite)
    app.put('/api/user/:userId/website/:websiteId', updateWebsite)
    app.delete('/api/user/:userId/website/:websiteId', deleteWebsite)



    function findWebsitesByUser(req,res) {
        websiteModel
            .findAllWebsitesForUser(req.params.userId)
            .then(function (websites) {
                res.json(websites);
            })

    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            });
    }

    function createWebsite(req, res) {

        var website=req.body;
        var userId= req.params.userId;
        websiteModel
            .createWebsiteForUser(userId, website)
            .then(function (website) {
                res.json(website);
            });
    }

    function updateWebsite(req, res) {
        var websiteId= req.params.websiteId;
        var website=req.body;
        websiteModel
            .updateWebsite(websiteId, website)
            .then(function (status) {
                res.send(status);
            });
    }

    function deleteWebsite(req,res) {
       var websiteId= req.params.websiteId;
        websiteModel
            .deleteWebsitesForUser(websiteId)
            .then(function (status) {
                res.json(status);
            });

    }


