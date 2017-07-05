var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel' ,pageSchema);
var websiteModel = require('../website/website.model.server');

pageModel.findAllPages= findAllPages;
pageModel.createPage = createPage;
pageModel.findPageById = findPageById;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.deletePage = deletePage;
pageModel.updatePage = updatePage;

module.exports = pageModel;


function updatePage(pageId, newPage) {
    return pageModel
        .update({_id: pageId}, {$set: newPage});
}

function deletePage(pageId) {
    return pageModel
        .remove({_id: pageId})
        .then(function (status) {
            return websiteModel
                .deletePage(pageId);
        });
}

function findAllPagesForWebsite(websiteId) {
    return pageModel
        .find({_website: websiteId})
        .populate('_website')
        .exec();
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function createPage(websiteId, page) {
    page._website=websiteId;
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel
                .addPage(websiteId, page._id);
        });
}

function findAllPages() {
    return pageModel.find();
}