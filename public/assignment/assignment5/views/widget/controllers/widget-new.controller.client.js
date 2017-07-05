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
                _id: (new Date()).getTime() + "",
                name: "",
                widgetType: widgetType,
                pageId: model.pageId
            };


            widgetService.createWidget(model.pageId, widget);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/'+widget._id);
            return widget;

        }




    }
})();