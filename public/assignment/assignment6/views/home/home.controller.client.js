/**
 * Created by manika on 7/20/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('homeController', homeController)
    
    function homeController(currentUser) {
        var model=this;
        model.currentUser = currentUser;
        model.logout = logout;

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login')
                });
        }
    }

})();