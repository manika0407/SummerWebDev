(function () {
    angular
        .module('BookAppMaker')
        .controller('adminUsersController', adminUsersController);

    function adminUsersController(userService, currentUser,$location, bookService) {
        var model = this;
        model.deleteUser = deleteUser;
        model.findAllUsers = findAllUsers;
        model.createUser = createUser;
        model.selectUser = selectUser;
        model.updateUser = updateUser;
        model.currentUser = currentUser;
        model.logout = logout;

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/')
                });
        }


        init();


        function updateUser(user) {
            console.log(user);
            userService
                .updateUser(user._id, user)
                .then(findAllUsers);
        }

        function selectUser(user) {
             model.user = angular.copy(user);
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
                    model.users = users;

                });
        }
    }
})();