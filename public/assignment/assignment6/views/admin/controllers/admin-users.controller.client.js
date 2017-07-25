/**
 * Created by manika on 7/21/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller('adminUserController', adminUserController)
    
    function adminUserController(userService) {
        var model=this;
        model.deleteUser=deleteUser;
        model.selectUser=selectUser;
        model.createUser=createUser;
        model.updateUser=updateUser;


        function init() {
            findAllUsers();
        }
        init();

        function deleteUser(user) {
            userService
                .deleteUser(user._id)
                .then(findAllUsers())
        }

        function selectUser(user) {
            model.user=angular.copy(user);
        }

        function createUser(user) {
            userService
                .createUser(user)
                .then(findAllUsers())
        }
        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(findAllUsers);
        }

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    model.users=users;
                });
        }

            
    }
})();