/**
 * Created by manika on 6/12/17.
 */
(function(){
    angular
        .module("RestaurantSearch")
        .factory('userService', userService);
    
    function userService($http) {
        // var users = [
        //     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@gmail.com"},
        //     {_id: "100", username: "a", password: "a", firstName: "a", lastName: "a", email: "a@gmail.com"},
        //     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@regge.com"},
        //     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charles@bing.com"},
        //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "jose@neu.com"}
        // ];
        var api={
            createUser: createUser,
            findUserById:findUserById,
            findUserByCredentials:findUserByCredentials,
            findUserByUsername:findUserByUsername,
            updateUser: updateUser,
            deleteUser:deleteUser
        };
        return api;

        function createUser(user) {
            var url="/api/project/user/";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserById(userId){
            var url="/api/project/user/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findUserByCredentials(username,password) {
            var url="/api/project/user?username=" + username+"&password="+password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findUserByUsername(username) {
            var url = "/api/project/user?username="+username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        

        function updateUser(userId, user){
            var url="/api/project/user/"+ userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }
        function deleteUser(userId){
            var url="/api/project/user/"+ userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();