(function () {
    angular
        .module('MyBookApp')
        .service('searchService', searchService);

    function searchService($http) {


        var key="AIzaSyBKEEzacbCHSz4WP0vVrne0375gFQOXqvA"
        var urlBase= "https://www.googleapis.com/books/v1/volumes?q=text&maxResults=1&key=API_KEY";

        this.searchBook= searchBook;

        function searchBook(searchText) {
            var url = urlBase
                .replace("API_KEY",key)
                .replace("text", searchText);
            return $http.get(url)


        }

    }
})();