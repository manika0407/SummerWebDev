/**
 * Created by manika on 6/12/17.
 */
(function () {
        angular
            .module('WebAppMaker')
            .controller('registerController',registerController);

        function registerController($location, userService){

            var model=this;

            //event handlers

            model.register=register;


            //implementation
            function register(username,password,password2){

                if(username==null || password==null || password2==null || username=="" || password=="" || password2=="")
                {
                    model.error="Username, password and verify password details are mandatory";
                    return;
                }

                if(password!==password2){
                    model.error="Passwords must match";
                    return;
                }

                var found=userService.findUserByUsername(username);

                if(found!==null){
                    model.error="Username "+username+  " is not available";
                }
                else{
                    var user={
                        username: username,
                        password: password
                    };

                    userService.createUser(user);
                    $location.url('/user/'+ user._id);
                }


            }
        }
})();