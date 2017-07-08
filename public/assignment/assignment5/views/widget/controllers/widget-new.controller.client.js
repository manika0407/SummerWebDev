(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController",widgetNewController);
    function widgetNewController($location, widgetService, $routeParams) {
        var model=this;
        model.userId=$routeParams.userId;
        model.websiteId=$routeParams.websiteId;
        model.pageId=$routeParams.pageId;

        model.createWidget=createWidget;


        function createWidget(widgetType) {
            var widget = {
                _page: model.pageId,
                widgetType: widgetType
            };


            widgetService
                .createWidget(model.pageId, widget)
                .then(function (res) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/'+ res.data._id);
                    return res.data;
                })


        }




    }
})();