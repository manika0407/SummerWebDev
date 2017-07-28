(function () {
    angular
        .module('BookAppMaker')
        .service('searchService', searchService);

    function searchService($http) {

        this.searchBook= searchBook;
        var urlBase = url = "https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=1&key=AIzaSyBKEEzacbCHSz4WP0vVrne0375gFQOXqvA";


        function searchBook(searchText) {
            var url = urlBase
                .replace("harry+potter", searchText);
            return $http.get(url)


        }

    }
})();