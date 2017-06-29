/**
 * Created by manika on 6/12/17.
 */
(function () {
        angular
            .module('RestaurantSearch')
            .config(configuration);

        function configuration($routeProvider){
                $routeProvider
                    .when('/restaurants',{
                        templateUrl:'views/restaurant/templates/restaurant.view.client.html'
                    })

        }

})();