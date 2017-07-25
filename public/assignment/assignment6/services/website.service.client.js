/**
 * Created by manika on 6/12/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory('websiteService', websiteService);
    
    function websiteService($http) {



        var api={
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById:findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite:deleteWebsite
        };
        return api;

        function createWebsite(userId,website) {
           var url="/api/assignment6/user/"+userId+"/website";
           return $http.post(url,website)
               .then(function (response) {
                   return response.data;
               });
        }

        function findWebsitesByUser(userId){
            var url="/api/assignment6/user/"+userId+"/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function findWebsiteById(userId, websiteId) {

            var url="/api/assignment6/user/"+userId+"/website/"+websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        

        function updateWebsite(userId, websiteId, website){
           var url="/api/assignment6/user/"+userId+"/website/"+websiteId;
           return $http.put(url,website)
                 .then(function (response) {
                   return response.data;
               });

        }
        function deleteWebsite(userId, websiteId){
            var url="/api/assignment6/user/"+userId+"/website/"+websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });

        }

    }
})();