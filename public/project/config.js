/**
 * Created by manika on 6/12/17.
 */
(function () {
        angular
            .module('RestaurantSearch')
            .config(configuration);

        function configuration($routeProvider){
                $routeProvider
                    .when('/',{
                        templateUrl: 'views/common/home.view.client.html'
                    })
                    .when('default',{
                        templateUrl: 'views/common/home.view.client.html'
                    })



        }

})();