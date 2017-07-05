/**
 * Created by manika on 6/26/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .service('FlickrService', FlickrService );
    
    function FlickrService($http) {
        var key="04ced9543bfcb7141e6a9fba47834da8";
        var secret="e53684e4c2bdab73";
        var urlBase ="https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        this.searchPhotos=searchPhotos;

        function searchPhotos(searchText) {
            var url=urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchText);
            return $http.get(url);
        }
    }
})();