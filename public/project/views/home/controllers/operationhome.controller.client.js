
(function () {
    angular
        .module('BookAppMaker')
        .controller('homeController', homeController);

    function homeController ($location, homeService) {

        var model = this;


        model.searchBook = searchBook;



        function searchBook(searchText) {
            $location.url('/search/' + searchText);
        }

    }
})();
// <script>
// function handleResponse(response) {
//     for (var i = 0; i < response.items.length; i++) {
//         var item = response.items[i];
//         // in production code, item.text should have the HTML entities escaped.
//         document.getElementById("content").innerHTML += "<br>" + item.volumeInfo.title;
//     }
// }
// </script>
// <script src="https://www.googleapis.com/books/v1/volumes?q=harry+potter&callback=handleResponse"></script>