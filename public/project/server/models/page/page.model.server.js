
var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('projectPageModel', pageSchema);

pageModel.findAllPagesForwatchlist = findAllPagesForwatchlist;
pageModel.createPage = createPage;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
// pageModel.addWidgetToArray = addWidgetToArray;

module.exports = pageModel;

function findPageById(pageId){
    return pageModel.findById(pageId);
}

function createPage(watchlistId, page){
    page._watchlist = watchlistId;
    return pageModel.create(page);
}

function findAllPagesForwatchlist(watchlistId){
    return pageModel.find({_watchlist: watchlistId});
}

function updatePage(pageId, page){
    return pageModel.update({_id: pageId}, {$set: page});
}

function deletePage(pageId){
    return pageModel.remove({_id: pageId});
}




