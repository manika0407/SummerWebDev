
(function () {
      angular
          .module('BookAppMaker')
          .controller('loginController', loginController);


      function loginController($location, userService) {

          var model = this;

          model.login = login;


          function login(username, password) {
              // var found = userService.findUserByCredentials(username, password);
              if(username && password){
              userService
              // .findUserByCredentials(username, password)
                  .login(username, password)
                  .then(login, loginError);
              function login(user) {

                  if (user) {
                      if(user.roles[0] === "BUYER"){
                      $location.url('/profile/buyer');}
                      else if(user.roles[0] === "SELLER"){
                          $location.url('/profile/seller');

                      } else {

                          $location.url('/manage');
                      }
                  } else {
                      model.message = "Sorry, " + username + " not found. Please try again!";
                  }
              }

              function loginError() {
                  model.message = "Sorry, not found. Please try again!";
              }
          }
          }
      }
      
})();