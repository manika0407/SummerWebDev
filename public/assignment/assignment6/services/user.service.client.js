/**
 * Created by manika on 6/12/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory('userService', userService);
    
    function userService($http) {



        var api={
            createUser: createUser,
            findUserById:findUserById,
            findUserByCredentials:findUserByCredentials,
            login: login,
            checkLoggedIn: checkLoggedIn,
            checkAdmin: checkAdmin,
            logout: logout,
            register: register,
            findUserByUsername:findUserByUsername,
            updateUser: updateUser,
            deleteUser:deleteUser,
            findAllUsers: findAllUsers,
            unregister: unregister
        };
        return api;
        function checkAdmin() {
            var url= "/api/assignment6/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

         function checkLoggedIn() {
             var url= "/api/assignment6/checkLoggedIn";
             return $http.get(url)
                 .then(function (response) {
                     return response.data;
                 });
         }
         function logout() {
             var url="/api/assignment6/logout";
             return $http.post(url)
                 .then(function (response) {
                     return response.data;
                 })
         }
         
         function register(user) {
             var url="/api/assignment6/register";
             return $http.post(url, user)
                 .then(function (response) {
                     return response.data;
                 })
         }

         function unregister() {
             var url="/api/assignment6/unregister";
             return $http.post(url)
                 .then(function (response) {
                     return response.data;
                 });
         }

        function login(username, password) {
            var url="/api/assignment6/login";
            var credentials={
                username: username,
                password: password
            }
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url="/api/assignment6/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                })


        }

        function findUserById(userId){
            var url="/api/assignment6/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });


        }

        function findUserByCredentials(username,password) {
            var url="/api/assignment6/user?username=" + username+"&password="+password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/assignment6/user?username="+username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }


        function updateUser(userId, user){
            var url="/api/assignment6/user/"+ userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });

        }
        function deleteUser(userId){
            var url="/api/assignment6/user/"+ userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function findAllUsers() {
            var url="/api/assignment6/user";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();