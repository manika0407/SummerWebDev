/**
 * Created by manika on 6/12/17.
 */
(function () {
        angular
            .module('WebAppMaker')
            .controller('profileController',profileController);

        function profileController($location, userService, $routeParams, $route) {
            var model=this;

            model.userId= $routeParams['userId'];
            model.updateUser=updateUser;
            model.deleteUser= deleteUser;
            model.reloadPage=reloadPage;

            function init() {
                userService
                    .findUserById(model.userId)
                    .then(renderUser);
            }
            init();

            function renderUser(user) {
                model.user = user;
            }


            function updateUser(user) {
                model.message=null;
                model.error=null;
                if(model.password!==model.verifyPassword)
                {
                    model.error="Passwords does not match";
                    return;
                }

                if (model.password !== null && (typeof model.password !== 'undefined') && model.password !== '') {
                    model.currentUser.password = model.password;
                }


                userService
                    .updateUser(user._id,user)
                    .then(function () {
                        model.message="User updated successfully!!";
                    }
                    );

            }
            function reloadPage() {
                $route.reload();
            }

            function deleteUser(user) {
                userService
                    .deleteUser(user._id)
                    .then(function () {
                        $location.url('/login');
                    });

            }
        }
})();