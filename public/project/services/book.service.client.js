(function () {
    angular
        .module('MyBookApp')
        .service('bookService', bookService);

    function bookService($http) {
        var projectURL='/api/project';
        var bookURL='/api/project/book';
        var api= {

        findAllBooksForUser: findAllBooksForUser,
        findBookById: findBookById,
        deleteBook: deleteBook,
        createBook: createBook,
        updateBook: updateBook,
        findAllBooks: findAllBooks,
        findBookByISBN: findBookByISBN,
        findBookByName : findBookByName,
        findBookByAuthor : findBookByAuthor,
        updateInventory : updateInventory,
        adminDelete : adminDelete,
        adminUpdate : adminUpdate
    };

    return api;

        function adminUpdate(bookId, book) {
            var url = projectURL+"/admin/book/" + bookId;
            return $http.put(url, book)
                .then(function (response) {
                    return response.data;
                });
        }

        function adminDelete(userId) {
            var url = projectURL+"/admin/user/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function updateInventory(bookId, quantity) {
            var url = bookURL+"/inventory/" + bookId;
            var inv = {inventory: quantity};
            return $http.put(url, inv)
                .then(function (response) {
                    return response.data;
                });
        }



        function findBookByISBN(isbn) {
            return $http.get(projectURL+"/isbn/book?isbn=" + isbn)
                .then(function (response) {
                    return response.data;
                });
        }

        function findBookByAuthor(author) {
            return $http.get(projectURL+"/author/book?author=" + author)
                .then(function (response) {
                    return response.data;
                });
        }

        function findBookByName(bookName) {
            return $http.get(projectURL+"/name/book?bookName=" + bookName)
                .then(function (response) {
                    return response.data;
                });
        }








        function findAllBooks() {
            var url = projectURL+"/books";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function updateBook (bookId, book) {
            var url = bookURL+"/" + bookId;
            return $http.put(url, book)
                        .then(function (response) {
                            return response.data;
                        });
        }

        function createBook(book, userId){
            var url = projectURL+"/user/"+userId+"/book";
            return $http
                        .post(url, book)
                        .then(function (response) {
                            return response.data;
                        });
        }



        function deleteBook(userId, bookId) {
            var url = bookURL+"/" + bookId;
            return $http.delete(url)
                        .then(function (response) {
                            return response.data;
                        });
        }



        function findBookById(bookId) {
            var url = bookURL+"/" + bookId;
            return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        });
        }

        function findAllBooksForUser(userId) {
            var url = projectURL+"/user/"+userId+"/book";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();