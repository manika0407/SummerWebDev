/**
 * Created by manika on 6/12/17.
 */
(function () {
        angular
            .module('WebAppMaker')
            .controller('profileController',profileController);

        function profileController($location, userService, $routeParams, $route) {
            var model=this;

            model.updateProfile=updateProfile;
            model.userId= $routeParams.userId;
            model.reloadPage=reloadPage;
            model.deleteUser= deleteUser;
            
            function init() {
                model.user = angular.copy(userService.findUserById(model.userId));
            }
            init();

            function updateProfile() {
                if(model.password!== model.verifyPassword){
                    model.error= "Passwords does not Match. Try again";
                    return;
                }
                if(model.password!== null && (typeof model.password !== 'undefined') && model.password!== ''){
                    model.user.password=model.password;
                }
                $route.reload();
                userService.updateUser(model.userId, model.user);
            }
            function reloadPage() {
                $route.reload();
            }

            function deleteUser() {
                userService.deleteUser(model.userId);
                $location.url('/');
            }
        }
})();