
(function () {
    angular
        .module('BookAppMaker')
        .controller('mainController', mainController);
    
    function mainController(currentUser, userService, $location) {
        var model = this;
        model.currentUser = currentUser;

        model.logout = logout;

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/')
                });
        }

    }
})();