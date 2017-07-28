
(function () {
    angular
        .module('BookAppMaker')
        .controller('searchController', searchController);

    function searchController ($routeParams, searchService, $location) {

        var model = this;

        model.text = $routeParams['text'];
        model.searchBook = searchBook;
        model.handleResponse = handleResponse;

        function init() {
            searchBook(model.text);
        }
        init();

        function searchBook(searchText) {
            searchService
                .searchBook(searchText)
                .then(handleResponse);
        }

        function handleResponse(response) {
            model.items = [];

            for (var i = 0; i < response.data.items.length; i++) {
                var item = response.data.items[i];
                model.items.push(item.volumeInfo);
            }

        }


    }
})();