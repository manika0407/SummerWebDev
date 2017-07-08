/**
 * Created by manika on 6/12/17.
 /home/manika/WebstormProjects/WebDevSummer/public/assignment/views/user/controllers/login.controller.client.js
 */
(function () {
    angular
        .module('BookAppMaker')
        .controller('loginController',loginController);

    function loginController($location, userService){

        var model=this;


        model.login=function(username,password){

            if (( typeof username === 'undefined' ) || username === null ||
                ( typeof username === 'undefined' ) || username === ''
                || ( typeof password === 'undefined' ) || password === null ||
                ( typeof password === 'undefined' ) || password === '' ){
                model.error="Username, Password fields are compulsary. Kindly fill those.";
                return;
            }

            //var found=userService.findUserByCredentials(username,password);

            userService
                .findUserByCredentials(username, password)
                .then(login, handleError);

            function handleError() {
                model.message="Username "+ username + " Not found";
                return;
            }

            function login(found){
                if(found!==null){
                    $location.url('/user/'+ found._id);
                }
                else{
                    model.message="Username "+ username + "Not found";
                    return;
                }
            }

        }
    }
})();