/**
 * Created by manika on 6/13/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("widgetService", widgetService);
    function widgetService($http, $routeParams) {

        this.createWidget = createWidget;
        this.findWidgetById = findWidgetById;
        this.findWidgetByPageId = findWidgetByPageId;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.sortWidget = sortWidget;

        function sortWidget(initial, final) {
            var url = "/page/"+ $routeParams.pageId + "/widget?initial=" + initial + "&final=" + final;
            $http.put(url);
        }

        function createWidget(pageId, widget) {
            var url="/api/page/"+pageId+"/widget";
            var data = {
                pageId: pageId,
                widget: widget
            };
            return $http
                .post(url, data)
                .then(function (response) {
                    return response.data;
                })

        }

        function findWidgetById(widgetId) {

            var url="/api/widget/"+widgetId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findWidgetByPageId(pageId) {

            var url="/api/page/"+pageId+ "/widget";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })

        }

        function updateWidget(widgetId, widget) {
            var url="/api/widget/"+widgetId;
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                })

        }

        function deleteWidget(widgetId) {
            var url="/api/widget/"+widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

    }
})();

