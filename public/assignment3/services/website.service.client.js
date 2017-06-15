/**
 * Created by manika on 6/12/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory('websiteService', websiteService);
    
    function websiteService() {

        var websites = [
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
                "_id": "456",
                "name": "Leetcode",
                "developerId": "456",
                "description": "Leetcode is a website used by candidates to prepare for technical interviews"
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

        var api={
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById:findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite:deleteWebsite
        };
        return api;

        function createWebsite(website) {
           website._id=(new Date()).getTime()+"";
           websites.push(website);
        }

        function findWebsitesByUser(userId){
            var resultSet=[];
            for(var w in websites){
                if(websites[w].developerId===userId){
                    resultSet.push(websites[w]);
                }
            }
            return resultSet;
        }



        function findWebsiteById(websiteId){

            var website = websites.find(function (website) {
                return website._id === websiteId;
            });

            if (typeof website === 'undefined') {
                return null;
            }
            return website;
        }


        

        function updateWebsite(websiteId, website){
            var websiteToBeUpdated = findWebsiteById(websiteId);
            var index = websites.indexOf(websiteToBeUpdated);
            websites[index] = website;
            return;
        }
        function deleteWebsite(websiteId){
           var website=websites.find(function(website){
               return website._id=== websiteId;
           });
           var index=websites.indexOf(website);
           websites.splice(index,1);
        }

    }
})();