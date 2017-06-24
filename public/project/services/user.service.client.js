/**
 * Created by manika on 6/12/17.
 */
(function(){
    angular
        .module("RestaurantSearch")
        .factory('userService', userService);
    
    function userService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@gmail.com"},
            {_id: "100", username: "a", password: "a", firstName: "a", lastName: "a", email: "a@gmail.com"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@regge.com"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charles@bing.com"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "jose@neu.com"}
        ];
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
            user._id=(new Date()).getTime()+"";
            users.push(user);
        }

        function findUserById(userId){

            var user = users.find(function (user) {
                return user._id === userId;
            });

            if (typeof user === 'undefined') {
                return null;
            }
            return user;
        }
        
        function findUserByCredentials(username,password) {
            for(var u in users){
                var user=users[u];
                if(user.username==username && user.password==password){
                    return user;
                }
            }
            return null;
        }
        
        function findUserByUsername(username) {
           var user= users.find(function (user) {
               return user.username===username
           });
           if(typeof user==='undefined')
               return null;
            return user;
        }
        

        function updateUser(userId, user){
            var userToBeUpdated = findUserById(userId);
            var index = users.indexOf(userToBeUpdated);
            users[index] = user;
            return;
        }
        function deleteUser(userId){
           var user=users.find(function(user){
               return user._id=== userId;
           });
           var index=users.indexOf(user);
           users.splice(index,1);
        }
    }
})();