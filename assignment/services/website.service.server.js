var app = require('../../express');

    var websites = [
        {
            "_id": "456",
            "name": "Leetcode",
            "developerId": "456",
            "description": "Leetcode is a website used by candidates to prepare for technical interviews"
        },
        {
            "_id": "123",
            "name": "Facebook",
            "developerId": "456",
            "description": "Social Networking site"
        },

        {
            "_id": "234",
            "name": "Twitter",
            "developerId": "456",
            "description": "Micro blogging service"
        },



        {
            "_id": "890",
            "name": "Instagram",
            "developerId": "123",
            "description": "Photo Sharing App"
        },

        {
            "_id": "567",
            "name": "Linkedin",
            "developerId": "123",
            "description": "Social networking app for Professionals "
        },

        {
            "_id": "678",
            "name": "Quora",
            "developerId": "234",
            "description": "An app to which one can post any type of question and intellectuals will answer those questions"
        }
    ];

    app.get('/api/user/:userId/website', findWebsitesByUser)
    app.get('/api/user/:userId/website/:websiteId', findWebsiteById)
    app.post('/api/user/:userId/website', createWebsite)
    app.put('/api/user/:userId/website/:websiteId', updateWebsite)
    app.delete('/api/user/:userId/website/:websiteId', deleteWebsite)



    function findWebsitesByUser(req,res) {

        var resultSet=[];
        for(var w in websites){
            if(websites[w].developerId===req.params.userId){
                resultSet.push(websites[w]);
            }
        }
        res.json(resultSet);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        var website = findWebsite(websiteId);
        if (website) {
            res.json(website);
        }
        else {
            res.sendStatus(404);
        }
    }


        function createWebsite(req, res) {
        var website=req.body;
        website._id=(new Date()).getTime()+"";
        website.developerId = req.params.userId;
        websites.push(website);
        res.sendStatus(200);

    }

    function findWebsite(websiteId) {
        var website = websites.find(function (website) {
            return website._id === websiteId;
        });

        if (typeof website === 'undefined') {
            return null;
        }
        return website;
    }

    function updateWebsite(req, res) {
        var websiteId=req.params.websiteId;
        //var userId = req.params.userId;
        var website=req.body;
        var websiteToBeUpdated = findWebsite(websiteId);
        if(websiteToBeUpdated) {
            var index = websites.indexOf(websiteToBeUpdated);
            websites[index] = website;
            res.sendStatus(200);
        }
        else
            res.sendStatus(404);
    }

    function deleteWebsite(req,res) {
        var websiteId=req.params.websiteId;
        var websiteToBeDeleted = findWebsite(websiteId);
        if (websiteToBeDeleted) {
            var index = websites.indexOf(websiteToBeDeleted);
            websites.splice(index, 1);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }

    }


