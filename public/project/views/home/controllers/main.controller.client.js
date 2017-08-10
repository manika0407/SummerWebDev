
(function () {
    angular
        .module('MyBookApp')
        .controller('mainController', mainController);
    
    function mainController(currentUser, userService, $location) {
        var mainCtrl = this;
        mainCtrl.currentUser = currentUser;

        mainCtrl.logout = logout;

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/')
                });
        }

    }
})();