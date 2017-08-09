
(function () {
    angular
        .module('MyBookApp')
        .factory('userService', userService);

    function userService($http) {
    var userURL = '/api/project/user';
    var projectURL = '/api/project'
        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials:  findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            checkLoggedIn: checkLoggedIn,
            logout: logout,
            register: register,
            checkAdmin: checkAdmin,
            findAllUsers: findAllUsers,
            unregister: unregister,
            updateBook: updateBook,
            findFollowSellerById: findFollowSellerById,
            followSeller: followSeller,
            unfollowSeller: unfollowSeller,
            findBuyer: findBuyer,
            findBuyerForOrderAdmin: findBuyerForOrderAdmin,
            findSellerForOrderAdmin: findSellerForOrderAdmin
        };
        return api;




        function findSellerForOrderAdmin(userId) {
            var url = projectURL+"/admin/seller/order/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function findBuyerForOrderAdmin(userId) {
            var url = projectURL+"/admin/order/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function findBuyer(userId) {
           var url = projectURL+"/admin/buyer/user/"+userId;
           return $http.get(url)
               .then(function (response) {
                   return response.data;
               });
       }


        function unfollowSeller(userId, sellerId) {
            var url = projectURL+"unfollowseller/user/"+userId;
            var followId = {sellerId: sellerId};
            return $http.put(url, followId)
                .then(function (response) {
                    return response.data;
                });
        }


        function followSeller(userId, sellerId) {
            var url = projectURL+"/followseller/user/"+userId;
            var followId = {sellerId: sellerId};
            return $http.put(url, followId)
                .then(function (response) {
                    return response.data;
                });
        }

        function findFollowSellerById(userId,sellerId) {
            var url = projectURL+"follow/user/"+userId;
            var followId = {sellerId: sellerId};
            return $http.post(url, followId)
                .then(function (response) {
                    return response.data;
                });
        }




        function updateBook(userId, newBook) {
            var url = userURL+'/'+ userId+newBook;
            return $http.put(url, newBook)
                .then(function (response) {
                    return response.data;
                });
        }





        function unregister() {
            var url = projectURL+"/unregister";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function findAllUsers() {
            var url = projectURL+"/users";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });


        }


        function checkAdmin() {
            var url = projectURL+"/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function register(userObj) {
            var url = projectURL+"/register";
            return $http.post(url, userObj)
                .then(function (response) {
                    return response.data;
                });
        }
        
        
        function logout() {
            var url = projectURL+"/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });

        }





        function checkLoggedIn() {
            var url = projectURL+"/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        
        function login(username, password) {
            var url = projectURL+"/login";
            var credentials = {
                username: username,
                password: password
            };

            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });

        }
        
        
        function updateUser (userId, user) {
            var url = userURL+'/'+userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser (userId) {
            var url = userURL+'/'+userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function createUser(user) {
            var url = userURL;
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = userURL+'?username='+username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });


        }



        function findUserById(userId) {
            var url =userURL+'/'+userId;
            return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        });
        }
        function findUserByCredentials(username, password) {
           var url = userURL+"?username="+username+"&password="+password;
           return $http.get(url)
                       .then(function (response) {
                           return response.data;
                       });

            
        }

    }

})();