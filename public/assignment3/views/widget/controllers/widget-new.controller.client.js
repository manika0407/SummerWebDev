/**
 * Created by manika on 6/15/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController",widgetNewController);
    function widgetNewController($location, widgetService, $routeParams) {
        var model=this;
        model.userId=$routeParams.userId;
        model.website=$routeParams.websiteId;
        model.pageId=$routeParams.pageId;
        model.widgetTypeList = ['Header', 'Image', 'YouTube', 'HTML', 'Label', 'Text Input', 'Link', 'Button', 'Data Table', 'Repeater'];
        model.createWidget=createWidget;

        function createWidget(widgetType) {
            widgetType = widgetType.toUpperCase();
            if (widgetType === 'HEADER') {
                widgetType = 'HEADING';
            }
            var widget = {
                "widgetType": widgetType
            };
            widget = widgetService.createWidget(model.pageId, widget);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
        }
    }
})();