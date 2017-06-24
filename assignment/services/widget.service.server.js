/**
 * Created by manika on 6/24/17.
 */
module.exports=function (app) {
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

    app.get('/api/page/:pageId/widget', findWidgetByPageId);

    function findWidgetByPageId(req,res) {
        var pageId=req.params.pageId;
        var results = [];
        for (var widget in widgets) {
            if (widgets[widget].pageId == pageId) {
                results.push(widgets[widget]);
            }
        }
        res.json(results);
    }
}

