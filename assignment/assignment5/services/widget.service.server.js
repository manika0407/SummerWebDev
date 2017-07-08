
/**
 * Created by manika on 6/24/17.
 */
var app = require('../../../express');
var widgetModel = require('../models/widget/widget.model.server');

var multer=require('multer');
var upload= multer({dest: __dirname+'/../../../public/assignment/assignment5/uploads'});


app.get('/api/assignment5/page/:pageId/widget', findWidgetByPageId);
app.get('/api/assignment5/widget/:widgetId', findWidgetById);
app.post('/api/assignment5/page/:pageId/widget', createWidget);
app.put('/api/assignment5/widget/:widgetId', updateWidget);
app.delete('/api/assignment5/widget/:widgetId', deleteWidget);
app.post("/api/assignment5/upload", upload.single('myFile'), uploadImage);
app.put('/assignment5/page/:pageId/widget', sortWidget);

function sortWidget(req, res) {
    var start = req.query.initial;
    var end = req.query.final;
    var pageId = req.params.pageId;
    widgetModel
        .sortWidget(pageId, start, end)
        .then(function (widgets) {
            res.json(widgets);
        });
}

function findWidgetByPageId(req,res) {
    var pageId=req.params.pageId;
  widgetModel
      .findAllWidgetsForPage(pageId)
      .then(function (data) {
          res.json(data);
      })
}

function createWidget(req, res) {
    var pageId=req.body.pageId;
    var widget=req.body;

    widget.widgetType= req.body.widget.widgetType;
    widget._page = pageId;

    widgetModel
        .createWidget(widget._page, widget)
        .then(function (widget) {
            res.json(widget);
        });
}

function findWidgetById(req, res) {
    var widgetId=req.params.widgetId;
   widgetModel
       .findWidgetById(widgetId)
       .then(function (widget) {
           res.json(widget);
       }, function () {
           res.send(null);
       });
}

function updateWidget(req, res) {
    var widgetId=req.params.widgetId;
    var widget=req.body;
    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (response) {
            res.json(response);
        });
}

function deleteWidget(req, res) {
    var widgetId=req.params.widgetId;
   widgetModel
       .deleteWidget(widgetId)
       .then(function () {
           res.json(200)
       },
       function (err) {
           res.status(404).send(err);
       });

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

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            widget.url = '/assignment/assignment5/uploads/'+filename;

            widgetModel
                .updateWidget(widgetId, widget)
                .then(function () {
                    var callbackUrl = "/assignment/assignment5/#!/user/"+userId+"/website/" + websiteId + "/page/" + pageId + "/widget/"+widgetId;
                    res.redirect(callbackUrl);
                }, function (err) {
                    res.send(err);
                });
        });


}