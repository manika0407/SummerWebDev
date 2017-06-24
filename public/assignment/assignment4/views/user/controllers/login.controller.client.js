/**
 * Created by manika on 6/12/17.
 */
(function () {
        angular
            .module('WebAppMaker')
            .controller('loginController',loginController);

        function loginController($location, userService){

            var model=this;


            model.login=function(username,password){

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
                    }
                }

            }
        }
})();