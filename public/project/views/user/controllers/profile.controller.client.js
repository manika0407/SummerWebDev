
(function () {
      angular
          .module('MyBookApp')
          .controller('profileController', profileController);

      function profileController(currentUser, $location, $routeParams, userService) {

              var profileCtrl = this;
              profileCtrl.currentUser = currentUser;
              profileCtrl.userId = currentUser._id;
              profileCtrl.user = currentUser;

              profileCtrl.updateUser = updateUser;
              profileCtrl.deleteUser = deleteUser;
              profileCtrl.logout = logout;
              profileCtrl.unregister = unregister;



              

          function unregister() {
              userService
                  .unregister()
                  .then(function () {
                      $location.url('/');
                  });
          }

          function logout() {
                   userService
                       .logout()
                       .then(function () {
                          $location.url('/login')
                       });
               }
          
          
              function userError(error) {
                  profileCtrl.error = "User not found";
              }

              profileCtrl.updateUser = updateUser;
              profileCtrl.deleteUser = deleteUser;



          function updateUser (userId, user) {
              userService.updateUser(userId, user)
                         .then(function () {
                             profileCtrl.message = "User updated Successfully!!";
                         });
          }

          function deleteUser (userId) {
              userService.deleteUser(userId)
                         .then(function () {
                             $location.url('/login');
                         }, function () {
                             profileCtrl.error = "Sorry, Unable to delete this user";
                         });
          }

          }
      
})();