/**
 * Created by manika on 6/13/17.
 */
(function(){
    angular
        .module('WebAppMaker')
        .controller('widgetListController',widgetListController);

    function widgetListController($sce) {
        var model=this;



        var widgets = [
                {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
                {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                {
                    "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"
                },
                {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words</p>"},
                {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                {
                    "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E"
                },
                {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];
        model.widgets=widgets;
        model.trustThisContent=trustThisContent;
        model.getYoutubeEmbedUrl=getYoutubeEmbedUrl;

        function trustThisContent(html) {
            // diligence to scrub any unsafe content
            return $sce.trustAsHtml(html);
        }
        function getYoutubeEmbedUrl(youTubeLink) {
            var embedUrl="https://www.youtube.com/embed/";
            var youTubeLinkParts= youTubeLink.split('/');
            var id=youTubeLinkParts[youTubeLinkParts.length-1];
            embedUrl+= id;
            return $sce.trustAsResourceUrl(embedUrl);
        }

    }
})();