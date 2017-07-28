(function () {
    angular
        .module('BookAppMaker')
        .service('bookService', bookService);

    function bookService($http) {
        // any other function that is not tied to 'this' is private function
        // only tied to 'this' can be publicly used outside
        this.findAllBooksForUser = findAllBooksForUser;
        this.findBookById = findBookById;
        this.deleteBook = deleteBook;
        this.createBook = createBook;
        this.updateBook = updateBook;
        this.findAllBooks = findAllBooks;
        this.findBookByISBN = findBookByISBN;
        this.findBookByAuthor = findBookByAuthor;
        this.findBookByName = findBookByName;
        this.updateInventory = updateInventory;
        this.adminDelete = adminDelete;
        this.adminUpdate = adminUpdate;











        function adminUpdate(bookId, book) {
            var url = "/api/project/admin/book/" + bookId;
            return $http.put(url, book)
                .then(function (response) {
                    return response.data;
                });
        }

        function adminDelete(userId) {
            var url = "/api/project/admin/user/"+userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function updateInventory(bookId, quantity) {
            var url = "/api/project/book/inventory/" + bookId;
            var inv = {inventory: quantity};
            return $http.put(url, inv)
                .then(function (response) {
                    return response.data;
                });
        }



        function findBookByISBN(isbn) {
            return $http.get("/api/project/isbn/book?isbn=" + isbn)
                .then(function (response) {
                    return response.data;
                });
        }

        function findBookByAuthor(author) {
            return $http.get("/api/project/author/book?author=" + author)
                .then(function (response) {
                    return response.data;
                });
        }

        function findBookByName(bookName) {
            return $http.get("/api/project/name/book?bookName=" + bookName)
                .then(function (response) {
                    return response.data;
                });
        }








        function findAllBooks() {
            var url = "/api/project/books";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }



        function updateBook (bookId, book) {
            var url = "/api/project/book/" + bookId;
            return $http.put(url, book)
                        .then(function (response) {
                            return response.data;
                        });
        }

        function createBook(book, userId){
            var url = "/api/project/user/"+userId+"/book";
            return $http
                        .post(url, book)
                        .then(function (response) {
                            return response.data;
                        });
        }



        function deleteBook(userId, bookId) {
            var url = "/api/project/book/" + bookId;
            return $http.delete(url)
                        .then(function (response) {
                            return response.data;
                        });
        }



        function findBookById(bookId) {
            var url = " /api/project/book/" + bookId;
            return $http.get(url)
                        .then(function (response) {
                            return response.data;
                        });
        }

        function findAllBooksForUser(userId) {
            var url = "/api/project/user/"+userId+"/book";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();