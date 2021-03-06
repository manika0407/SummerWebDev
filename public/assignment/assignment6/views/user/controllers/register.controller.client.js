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

                if (( typeof username === 'undefined' ) || username === null ||
                    ( typeof username === 'undefined' ) || username === ''
                    || ( typeof password === 'undefined' ) || password === null ||
                    ( typeof password === 'undefined' ) || password === '' || ( typeof password2 === 'undefined' ) || password2 === null
                    || ( typeof password2 === 'undefined' ) || password2 === '' ){
                    model.error="Username, Password and Password Confirmation fields are compulsary. Kindly fill those.";
                    return;
                }


                if(password!==password2){
                    model.error="Passwords must match";
                    return;
                }

               userService.findUserByUsername(username)
                   .then(function () {
                           model.error="Sorry, username "+username+" is taken";
                       }, function () {
                           var user={
                               username: username,
                               password: password
                           };
                           userService
                               .register(user)
                               .then(function (user) {
                                   $location.url('/profile');
                               })
                       })



            }
        }
})();