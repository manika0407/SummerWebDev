
(function () {
      angular
          .module('MyBookApp')
          .controller('loginController', loginController);


      function loginController($location, userService) {

          var loginCtrl = this;

          loginCtrl.login = login;


          function login(username, password) {
              if(username && password){
              userService
                  .login(username, password)
                  .then(login, loginError);
              function login(user) {

                  if (user) {
                      if(user.roles[0] === "BUYER"){
                      $location.url('/profile/buyer');}
                      else if(user.roles[0] === "SELLER"){
                          $location.url('/profile/seller');

                      } else {
                          $location.url('/admin');
                      }
                  } else {
                      loginCtrl.message = "Sorry, " + username + " not found. Please try again!";
                  }
              }

              function loginError() {
                  loginCtrl.message = "Sorry, not found. Please try again!";
              }
          }
          }
      }
      
})();