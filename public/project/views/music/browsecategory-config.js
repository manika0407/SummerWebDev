/**
 * Created by manika on 6/12/17.
 */
(function () {
        angular
            .module('MusicSearch')
            .config(configuration);

        function configuration($routeProvider){
                $routeProvider
                    .when('/browsecategory',{
                        templateUrl:'views/music/templates/browsecategory.view.client.html'
                    })

        }

})();