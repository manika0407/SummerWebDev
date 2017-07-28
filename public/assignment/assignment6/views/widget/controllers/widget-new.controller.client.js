(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController",widgetNewController);
    function widgetNewController($location, widgetService, $routeParams, currentUser) {
        var model = this;
        model.userId = currentUser._id;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;

        model.createWidget=createWidget;


        function createWidget(widgetType) {
            var widget = {
                _page: model.pageId,
                widgetType: widgetType
            };


            widgetService
                .createWidget(model.pageId, widget)
                .then(function (res) {
                    $location.url('/website/' + model.websiteId + '/page/' + model.pageId + '/widget/'+ res.data._id);
                    return res.data;
                })


        }




    }
})();