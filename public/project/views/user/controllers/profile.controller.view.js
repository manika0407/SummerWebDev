
(function () {
      angular
          .module('BookAppMaker')
          .controller('profileController', profileController);

      function profileController(currentUser, $location, $routeParams, userService) {

              var model = this;
              model.currentUser = currentUser;
              model.userId = currentUser._id;//$routeParams['userId'];
              model.user = currentUser;

              model.updateUser = updateUser;
              modeldeleteUser = deleteUser;
              model.logout = logout;
              model.unregister = unregister;



              

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
                  model.error = "User not found";
              }

              model.updateUser = updateUser;
              model.deleteUser = deleteUser;



          function updateUser (userId, user) {
              userService.updateUser(userId, user)
                         .then(function () {
                             model.message = "User update was successful!!";
                         });
          }

          function deleteUser (userId) {
              userService.deleteUser(userId)
                         .then(function () {
                             $location.url('/login');
                         }, function () {
                             model.error = "Unable to delete you!";
                         });
          }

          }
      
})();