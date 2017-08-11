var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);

pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.createPage = createPage;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
// pageModel.addWidgetToArray = addWidgetToArray;

module.exports = pageModel;

function findPageById(pageId){
    return pageModel.findById(pageId);
}

function createPage(websiteId, page){
    page._website = websiteId;
    return pageModel.create(page);
}

function findAllPagesForWebsite(websiteId){
    return pageModel.find({_website: websiteId});
}

function updatePage(pageId, page){
    return pageModel.update({_id: pageId}, {$set: page});
}

function deletePage(pageId){
    return pageModel.remove({_id: pageId});
}









