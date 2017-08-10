(function () {
    angular
        .module('MyBookApp')
        .controller('adminUsersController', adminUsersController);

    function adminUsersController(userService, currentUser,$location, bookService) {
        var adminUserCtrl = this;
        adminUserCtrl.deleteUser = deleteUser;
        adminUserCtrl.findAllUsers = findAllUsers;
        adminUserCtrl.createUser = createUser;
        adminUserCtrl.selectUser = selectUser;
        adminUserCtrl.updateUser = updateUser;
        adminUserCtrl.currentUser = currentUser;
        adminUserCtrl.logout = logout;

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/')
                });
        }


        init();


        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(findAllUsers);
        }

        function selectUser(user) {
             adminUserCtrl.user = angular.copy(user);
         }


        function createUser(user) {
            userService
                .createUser(user)
                .then(findAllUsers);
        }

        function deleteUser(user) {
           userService
               .deleteUser(user._id)
               .then(function (status) {
                   bookService
                       .adminDelete(user._id)
                       .then(findAllUsers);
               });
        }

        function init() {
            findAllUsers();
        }

        function findAllUsers() {
            userService
                .findAllUsers()
                .then(function (users) {
                    adminUserCtrl.users = users;

                });
        }
    }
})();