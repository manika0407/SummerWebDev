
(function () {
    angular
        .module('MyBookApp')
        .controller('homeController', homeController);

    function homeController ($location, homeService) {

        var model = this;


        model.searchBook = searchBook;



        function searchBook(searchText) {
            $location.url('/search/' + searchText);
        }

    }
})();
