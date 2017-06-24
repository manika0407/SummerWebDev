/**
 * Created by manika on 6/13/17.
 */
(function(){
    angular
        .module('WebAppMaker')
        .controller('widgetListController',widgetListController);

    function widgetListController($location, widgetService, $routeParams, $sce) {
        var model=this;
        model.userId=$routeParams.userId;
        model.websiteId=$routeParams.websiteId;
        model.pageId=$routeParams.pageId;
        model.trustThisContent=trustThisContent;
        model.getYoutubeEmbedUrl=getYoutubeEmbedUrl;

        function init() {
            widgetService
                .findWidgetByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets=widgets;
                })
        }
        init();



        function trustThisContent(html) {
            // diligence to scrub any unsafe content
            return $sce.trustAsHtml(html);
        }
        function getYoutubeEmbedUrl(youTubeLink) {

                var embedUrl = "https://www.youtube.com/embed/";
                var youTubeLinkParts = youTubeLink.split('/');
                var id = youTubeLinkParts[youTubeLinkParts.length - 1];
                embedUrl += id;
                return $sce.trustAsResourceUrl(embedUrl);
        }

    }
})();