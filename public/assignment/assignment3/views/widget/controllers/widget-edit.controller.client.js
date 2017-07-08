/**
 * Created by manika on 6/15/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .controller('widgetEditController',widgetEditController);
    function widgetEditController($location, widgetService, $routeParams) {

        var model = this;
        model.userId = $routeParams.userId;
        model.websiteId = $routeParams.websiteId;
        model.pageId = $routeParams.pageId;
        model.widgetId = $routeParams.widgetId;
        model.deleteWidget = deleteWidget;
        model.updateWidget = updateWidget;


        function init() {
            model.widget = widgetService.findWidgetById(model.widgetId);
        }

        init();

        function deleteWidget() {
            widgetService.deleteWidget(model.widgetId);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');

        }

        function updateWidget() {
            if ((model.widget.widgetType === 'HEADING' || model.widget.widgetType === 'HTML') && (model.widget.text === null || typeof model.widget.text === 'undefined' || model.widget.text === '')) {
                model.error = " Text is mandatory ";
                return;
            }
            else if ((model.widget.widgetType === 'IMAGE' || model.widget.widgetType === 'YOUTUBE') && (model.widget.url === null || typeof model.widget.url === 'undefined' || model.widget.url === '')) {
                model.error = " URL is mandatory ";
                return;
            }
            widgetService.updateWidget(model.widgetId, model.widget);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
        }
    }
})();