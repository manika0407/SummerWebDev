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
        model.websiteId=$routeParams.websiteId;
        model.pageId=$routeParams.pageId;
        model.widgetType=$routeParams.widgetType;
        model.createWidget=createWidget;

        function createWidget() {

            if (model.widget === null || typeof model.widget === 'undefined' || model.widget === '') {
                model.widget = {
                    widgetType: model.widgetType
                };
            }

            model.widget.widgetType = model.widgetType;
            if ((model.widget.widgetType === 'HEADING' || model.widget.widgetType === 'HTML') && (model.widget.text === null || typeof model.widget.text === 'undefined' || model.widget.text === '')) {
                model.error = " Text is mandatory ";
                return;
            }
            else if ((model.widget.widgetType === 'IMAGE' || model.widget.widgetType === 'YOUTUBE') && (model.widget.url === null || typeof model.widget.url === 'undefined' || model.widget.url === '')) {
                model.error = " Invalid URL format ";
                return;
            }

            widgetService
                .createWidget(model.pageId, model.widget)
                .then(function (widget) {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                })


        }




    }
})();
