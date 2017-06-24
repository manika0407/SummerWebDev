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
    app.get('/api/widget/:widgetId', findWidgetById);
    app.post('/api/page/:pageId/widget', createWidget);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);

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

    function createWidget(req, res) {
        var pageId=req.params.pageId;
        var widget=req.body;
        widget._id = new Date().getTime() + "";
        widget.pageId = pageId;
        widgets.push(widget);
        res.sendStatus(200);
    }

    function findWidgetById(req, res) {
        var widgetId=req.params.widgetId;
        var widget = findWidget(widgetId);
        if(widget)
            res.json(widget);
        else
            res.sendStatus(404);
    }

    function findWidget(widgetId) {
        var widget = widgets.find(function (widget) {
            return widget._id === widgetId;
        });

        if (typeof widget === 'undefined') {
            return null;
        }
        return widget;
    }

    function updateWidget(req, res) {
        var widgetId=req.params.widgetId;
        var widget=req.body;
        var widgetToBeUpdated = findWidget(widgetId);
        if(widgetToBeUpdated) {
            var index = widgets.indexOf(widgetToBeUpdated);
            widgets[index] = widget;
            res.sendStatus(200);
        }
        else
            res.sendStatus(404);
    }

    function deleteWidget(req, res) {
        var widgetId=req.params.widgetId;
        var widgetToBeDeleted = findWidget(widgetId);
        if(widgetToBeDeleted){
            var index = widgets.indexOf(widgetToBeDeleted);
            widgets.splice(index, 1);
            res.sendStatus(200);
        }
        else {
            res.sendStatus(404);
        }
    }
}

