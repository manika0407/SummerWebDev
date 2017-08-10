
(function () {
      angular
          .module('MyBookApp')
          .controller('registerController', registerController);
          function registerController($location, userService) {

              var registerCtrl = this;

              registerCtrl.register = register;


              function register(username, password, password2, role) {

                  if (username === null || username === '' || typeof username === 'undefined') {
                      registerCtrl.error1 = 'Username is required!!';
                      registerCtrl.error2 = null;
                      registerCtrl.error3 = null;
                      registerCtrl.error4 = null;
                      registerCtrl.error5 = null;
                      registerCtrl.submitted1 = true;
                      return;
                  }

                  if (password === null || password === '' || typeof password === 'undefined') {
                      registerCtrl.error1 = null;
                      registerCtrl.error2 = 'Password is required!';
                      registerCtrl.error3 = null;
                      registerCtrl.error4 = null;
                      registerCtrl.error5 = null;
                      registerCtrl.submitted2 = true;
                      return;
                  }
                  if (password2 === null || password2 === '' || typeof password2 === 'undefined') {
                      registerCtrl.error1 = null;
                      registerCtrl.error2 = null;
                      registerCtrl.error3 = 'Verifying Password field is required!';
                      registerCtrl.error4 = null;
                      registerCtrl.error5 = null;
                      registerCtrl.submitted3 = true;
                      return;
                  }
                  if (password !== password2) {
                      registerCtrl.error1 = null;
                      registerCtrl.error2 = null;
                      registerCtrl.error3 = null;
                      registerCtrl.error4 = "Passwords don't match!";
                      registerCtrl.error5 = null;
                      registerCtrl.password = "";
                      registerCtrl.password2 = "";
                      registerCtrl.submitted2 = true;
                      registerCtrl.submitted3 = true;
                      return;
                  }
                  if (role === null || role === '' || typeof role === 'undefined') {
                      registerCtrl.error1 = null;
                      registerCtrl.error2 = null;
                      registerCtrl.error3 = null;
                      registerCtrl.error4 = null;
                      registerCtrl.error5 = "Role is required!";
                      registerCtrl.submitted4 = true;
                      return;

                  }


                  registerCtrl.error1 = null;
                  registerCtrl.error2 = null;
                  registerCtrl.error3 = null;
                  registerCtrl.error4 = null;
                  registerCtrl.error5 = null;




                  userService.findUserByUsername(username)
                      .then(rendUser);
                  function rendUser(user) {
                      if (user) {
                          registerCtrl.error1 = "Sorry,the username is already taken.";
                      } else {
                          var newUser = {
                              username: username,
                              password: password,
                              roles: role
                          };

                          userService
                              .register(newUser)
                              .then(function () {
                                  $location.url('/profile/'+role.toLowerCase());
                              });
                      }

                  }
              }
          }
      
})();