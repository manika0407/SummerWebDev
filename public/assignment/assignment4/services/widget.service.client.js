/**
 * Created by manika on 6/13/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("widgetService", widgetService);
    function widgetService($http) {

        this.createWidget = createWidget;
        this.findWidgetById = findWidgetById;
        this.findWidgetByPageId = findWidgetByPageId;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;

        var widgets = [
                {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "India in Finals"},
                {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "India facing Pakistan in CT 2017 Finals"},
                {
                    "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"
                },
                {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Bangladesh faced a humiliating defeat against India</p>"},
                {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Three Asian Countries in CT2017 Semi-Finals"},
                {
                    "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/m_5g_D_iP2s"
                },
                {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Confident England had to face a defeat against Pakistan</p>"}
            ];


        function createWidget(pageId, widget) {
            var url="/api/page/"+pageId+"/widget";
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                })

        }

        function findWidgetById(widgetId) {
            // var widget = widgets.find(function (widget) {
            //     return widget._id === widgetId;
            // });
            //
            // if (typeof widget === 'undefined') {
            //     return null;
            // }
            // return widget;

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

