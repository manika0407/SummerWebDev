/**
 * Created by manika on 6/12/17.
 */
(function () {
        angular
            .module('WebAppMaker')
            .controller('profileController',profileController);

        function profileController(currentUser, $location, userService, $routeParams, $route) {
            var model=this;

            model.userId= currentUser._id;
            model.user= currentUser;
            model.updateUser=updateUser;
            model.unregister= unregister;
            model.reloadPage=reloadPage;
            model.logout=logout;

                // userService
                //     .findUserById(model.userId)
                //     .then(renderUser);
            function init() {
                //renderUser(currentUser);
            }
            init();
            //
            //
            // function renderUser(user) {
            //     model.user = user;
            // }
            
            function logout() {
                userService
                    .logout()
                    .then(function () {
                        $location.url('/login');
                    })
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

            function unregister() {
                userService
                    .unregister()
                    .then(function () {
                        $location.url('/login');
                    });

            }
        }
})();