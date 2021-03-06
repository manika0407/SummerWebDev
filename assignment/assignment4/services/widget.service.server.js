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

    var multer=require('multer');
    var upload= multer({dest: __dirname+'/../../../public/assignment/assignment4/uploads'});


    app.get('/api/assignment4/page/:pageId/widget', findWidgetByPageId);
    app.get('/api/assignment4/widget/:widgetId', findWidgetById);
    app.post('/api/assignment4/page/:pageId/widget', createWidget);
    app.put('/api/assignment4/widget/:widgetId', updateWidget);
    app.delete('/api/assignment4/widget/:widgetId', deleteWidget);
    app.post("/api/assignment4/upload", upload.single('myFile'), uploadImage);
    app.put('/assignment4/page/:pageId/widget', sortWidget);

    function sortWidget(req, res) {
        var initial = req.query.initial;
        var final = req.query.final;
        var widgetContainer=[];
        var pageId = req.params.pageId;
        var length = widgets.length;
        for (var i =  length - 1; i >= 0; i--){
            if (widgets[i].pageId === pageId){
                widgetContainer.unshift(widgets[i]);
                widgets.splice(i, 1);
            }
        }
        var widget = widgetContainer[initial];
        widgetContainer.splice(initial, 1);
        widgetContainer.splice(final, 0, widget);
        widgets = widgets.concat(widgetContainer);
        res.sendStatus(200);
    }

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
        var pageId=req.body.pageId;
        var widget=req.body.widget;

        widget.pageId = pageId;
        widgets.push(widget);
       // res.json(widget);
    }

    function findWidgetById(req, res) {
        var widgetId=req.params.widgetId;
        var widget = findWidget(widgetId);
        if(widget) {
            res.json(widget);
        }
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
    function uploadImage(req, res) {

        var widgetId=req.body.widgetId;
        var width=req.body.width;
        var myFile=req.file;

        var userId=req.body.userId;
        var websiteId=req.body.websiteId;
        var pageId=req.body.pageId;

        var originalname= myFile.originalname;
        var filename= myFile.filename;
        var path= myFile.path;
        var destination= myFile.destination;
        var size= myFile.size;
        var mimetype= myFile.mimetype;

        var widget = widgets.find(function (widget) {
            return widget._id === widgetId;
        });


        widget.url= '/assignment/assignment4/uploads/' +filename;

        //console.log(myFile);
        var callbackUrl= "/assignment/assignment4/#!/user/"+userId+"/website/" + websiteId + "/page/" + pageId + "/widget/"+widgetId;

        res.redirect(callbackUrl);
    }


}

